import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import { cond, size } from 'lodash';
import logger from '../../api/logger';
import User from './user.model';
import Code from './code.model';
import CodeSearch from './codeSearch.model';
import Store from '../store/store.model';
import Staff from '../staff/staff.model';
import Setting from '../setting/setting.model';
import { error500, errorMessage, errorMessageWithValue, successMessage } from '../../../external/util/error';
import { generateRandom6Digits, generateRandom } from '../../helpers/string.helper';
import {
  USER_STATUS, PRICE_BUY_CODE, PRICE_BUY_STEP, BCRYPT_SALT_ROUNDS, STORE_STATUS
} from '../../constants';
import {
  ERROR_CODE,
  SUCCESS_CODE,
  TYPE_LOGIN,
  REDIS_TIME,
  START_CODE,
  START_CODE_STRING,
  DEBUG,
  DEFAULT_VALUE_CODE,
  WALLET_TYPE,
  REPORT,
  STAFF_STATUS
  , SHARE_HOST,
  SETTINGS_GENERAL_USER
} from '../../../external/constants/constants';
import APIError from '../../util/APIError';
import {
  redisGet, redisExpire, redisSet, redisDel
} from '../../util/Redis';
import { sendSMS } from '../../util/VihatSMS';
import {
  findOneUserByCondDAO, findUserByCond, getUserById, getUserDAO
} from './user.dao';
import { findOneCodeByCond } from './code.dao';
import { createCodeSearch, findOneCodeSearchByCondDAO } from './codeSearch.dao';
import { countStoreByCond, findStoreByCond, getStoreById } from '../store/store.dao';
import {
  countStaffByCond, findOneStaff, findStaffByCond, findStaffByCondPopulate
} from '../staff/staff.dao';
import { getSort } from '../../../external/middleware/query';
import { countCodeVipByCond, createManyCodeVipDAO, deleteManyCodeVip } from './codeVip.dao';
import { searchCodeVip } from '../../helpers/searchCdoe.helper';
import {
  countBestCodeByCond, createManyBestCode, findBestCodeByCond, findBestCodeByCondNoQuery, findOneBestCodeByCond
} from './bestCode.dao';
import { userSearchBuilder } from '../../../internal/elasticsearch/bodybuilder/bodybuilder';
import { UserElasticsearch } from '../../server';
import { UserPayload } from '../../../external/elasticsearch/user/user';
import { GetFileData } from '../../../external/util/file';

import {
  createWallet, getTransactionChangeCode, getWalletSim, paymentPaymeCreate, updateWalletFromSim
} from '../../../internal/grpc/wallet/request';
import StaticReport from './staticReport';
import { updateCodeNotify } from '../../../internal/grpc/notification/request';
import { addSimHistory, getSimHistories, getTotalSimHistories } from '../simHistory/simHistory.dao';
import { createSimAcc } from '../../../internal/grpc/store/request';
import { toObjectIdFromId } from '../../helpers/help.helper';
import { getSettingGeneralDAO } from '../admin/settingGeneral/settingGeneral.dao';
import { addHistoryPhoneNumber, countHistoryPhoneNumberChangeByCond } from '../changePhoneHistory/changePhoneHistory.dao';
import HistoryChangePhoneNumberModel from '../changePhoneHistory/changePhoneHistory.model';
import { getCodeSearch } from './codeSearch.dao';

/**
 * Login with email and password
 * @param {string} phone
 * @param {string} password
 * @returns {Promise.<*>} The user model after login success or an error
 */
export async function login(phone, password, type) {
  try {
    if (!Object.values([TYPE_LOGIN.USER, TYPE_LOGIN.STORE]).includes(type)) {
      return errorMessage(400, ERROR_CODE.INVALID_TYPE_LOGIN);
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return errorMessage(400, ERROR_CODE.PHONE_PASSWORD_INVALID_ERR);
    }
    if (!user.comparePassword(password)) {
      return errorMessage(400, ERROR_CODE.PHONE_PASSWORD_INVALID_ERR);
    }
    if (user.status === 2) {
      return errorMessage(401, ERROR_CODE.ACCOUNT_BANNDED);
    }
    if (user.status === 4) {
      const transactionCode = await getTransactionChangeCode(user._id);
      return errorMessageWithValue(403, ERROR_CODE.WAIT_PAYMENT_CODE, transactionCode);
    }
    let dataJWT = {};
    if (type === TYPE_LOGIN.STORE) {
      if (user.defaultStore) {
        const store = await Store.findOne({ _id: user.defaultStore });
        if (!store || store.status !== STORE_STATUS.ACTIVE) {
          return errorMessage(400, ERROR_CODE.STORE_PENDING_OR_INACTIVE);
        }
        await Store.updateOne({ _id: user.defaultStore }, { $set: { online: 1 } });
        // await StaticReport.updateOne(
        //   { type: REPORT.STORE_ONL },
        //   { $inc: { data: 1 } },
        //   { upsert: true }
        // );
        if (store.userId.toString() !== user._id.toString()) {
          const staff = await Staff.findOne({ userId: user._id, storeId: store._id });
          if (!staff) return errorMessage(403, ERROR_CODE.STORE_NOT_FOUND);
          dataJWT = {
            _id: user.defaultStore,
            access: 'staff',
            staffId: staff._id
          };
        } else {
          dataJWT = {
            _id: user.defaultStore,
            access: 'store'
          };
        }
      } else {
        const store = await Store.findOne({ userId: user._id });
        if (store) {
          if (store.status !== STORE_STATUS.ACTIVE) {
            return errorMessage(400, ERROR_CODE.STORE_PENDING_OR_INACTIVE);
          }
          dataJWT = {
            _id: store._id,
            access: 'store'
          };
          await Store.updateOne({ _id: store._id }, { $set: { online: 1, defaultStore: store._id } });
          // await StaticReport.updateOne(
          //   { type: REPORT.STORE_ONL },
          //   { $inc: { data: 1 } },
          //   { upsert: true }
          // );
        } else {
          await user.update({ online: 1 });
          await StaticReport.updateOne(
            { type: REPORT.USER_ONL },
            { $inc: { data: 1 } },
            { upsert: true }
          );
          dataJWT = {
            _id: user._id,
            access: 'user'
          };
        }
      }
    } else {
      await user.update({ online: 1 });
      await StaticReport.updateOne(
        { type: REPORT.USER_ONL },
        { $inc: { data: 1 } },
        { upsert: true }
      );
      dataJWT = {
        _id: user._id,
        access: 'user'
      };
    }
    const clientRefer = await User.findOne({ _id: user.refer });
    const token = user.signJWT(0, dataJWT);
    const dataUser = user.toJSON();
    if (type === 'user') {
      dataUser.qrCode = await generateQR(dataUser.code);
    }
    if (type === 'store') {
      if (dataJWT.access === 'store') {
        const storeQR = await Store.findOne({ userId: user._id });
        dataUser.qrCode = storeQR ? await generateQR(storeQR.code) : '';
      } else {
        const storeQr = await Store.findOne({ _id: dataJWT._id });
        dataUser.qrCode = storeQr ? await generateQR(storeQr.code) : '';
      }
    }
    dataUser.refUserId = clientRefer ? clientRefer.refer : '';
    dataUser.refUserCode = clientRefer ? clientRefer.code : '';
    dataUser.token = token;
    dataUser.access = dataJWT.access;
    dataUser.avatar = GetFileData(SHARE_HOST, user.avatar);
    if (user?.defaultStore) {
      const store = await Store.findById(user.defaultStore);
      const owner = (store.userId.toString() === user._id.toString());
      dataUser.storeInfo = {
        _id: store._id,
        owner
      };
    }
    return dataUser;
  } catch (error) {
    console.log(error);
    logger.error('User login error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updateDefaultShop(storeId, userId) {
  try {
    const user = await findOneUserByCondDAO({ _id: userId });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const store = await getStoreById(storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const staff = await findOneStaff({ storeId, userId, status: STAFF_STATUS.APPROVE });
    const dataJWT = {
      _id: store._id,
      access: TYPE_LOGIN.STORE,
      storeId: store._id
    };
    if (store.userId.toString() !== userId.toString() && !staff) return errorMessage(403, ERROR_CODE.STORE_NOT_FOUND);
    if (store.userId.toString() === userId.toString()) {
      dataJWT.access = TYPE_LOGIN.STORE;
    } else {
      dataJWT.access = TYPE_LOGIN.STAFF;
      dataJWT.staffId = staff._id;
    }
    user.defaultStore = store._id;
    await user.save();
    const token = user.signJWT(0, dataJWT);
    const dataUser = user.toJSON();
    dataUser.token = token;
    dataUser.access = dataJWT.access;
    dataUser.storeInfo = {
      _id: store._id,
      owner: store.userId.toString() === userId.toString()
    };
    return dataUser;
  } catch (error) {
    return error500(error);
  }
}

export async function getStoreUser(auth, type, query) {
  try {
    const sort = getSort(query);
    if (type === TYPE_LOGIN.STAFF) {
      const options = {
        userId: auth?._id,
        status: STAFF_STATUS.APPROVE
      };
      const page = await countStaffByCond(options);
      const stores = await findStaffByCond(options, query, sort);
      const promise = stores.map(async (sto) => {
        sto = sto.toObject();
        sto.storeInfo = await getStoreById(sto.storeId);
        return sto;
      });
      const result = await Promise.all(promise);
      return [page, result];
    }
    const options = {
      userId: auth._id
    };
    const result = await Promise.all([countStoreByCond(options), findStoreByCond(options, query, sort)]);
    const stores = result[1].map((item) => {
      if (item?.avatar) {
        item.avatar = GetFileData(SHARE_HOST, item.avatar);
      }
      return item;
    });
    return [result[0], stores];
  } catch (error) {
    return error500(error);
  }
}

/**
 * Update user profile information
 * @param user User model instance
 * @param avatar the avatar file information
 * @param avatar.filename
 * @returns {Promise.<*>} Return avatar url or an APIError
 */
export async function uploadUserAvatar(user, avatar) {
  const userProfile = await User.findById(user._id);
  if (!userProfile || !userProfile._id) {
    return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
  }
  try {
    userProfile.avatar = avatar;
    await userProfile.save();
    userProfile.UpdateUserToElasticsearch();
    return true;
  } catch (error) {
    logger.error('User uploadUserAvatar error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getCodeUserRandom() {
  try {
    const code = generateRandom(1, START_CODE, START_CODE_STRING);
    let codes = await Setting.findOne({ type: 'USER_CODE' }).lean();
    codes = codes?.data?.value || [];
    if (await User.findOne({ code }).lean()
      || codes.indexOf(code) > -1) {
      return await getCodeUserRandom();
    }
    return code;
  } catch (error) {
    logger.error('User getCodeUserRandom error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

const generateQR = async (text) => {
  try {
    const result = await QRCode.toDataURL(text.toString(), {
      errorCorrectionLevel: 'H', version: 4, width: 500, margin: 1.5
    });
    return result;
  } catch (err) {
    return err;
  }
};

/**
 * Register
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function register(data) {
  try {
    const hasUser = await User.findOne({ phone: data.phone });
    if (hasUser) {
      return errorMessage(400, ERROR_CODE.PHONE_REGISTERED);
    }
    const refInfo = await User.findOne({ code: { $regex: data.refer, $options: 'i' } }).lean();
    if (!refInfo) {
      return errorMessage(400, ERROR_CODE.REFER_NOT_FOUND);
    }
    const checked = await redisGet(data.phone);
    if (checked?.toString() !== data?.code.toString()) return errorMessage(404, ERROR_CODE.CODE_NOT_FOUND);
    const hasCode = await findOneCodeByCond({ status: true });
    const newCode = hasCode.code + 1;
    const code = await checkCodeToUser(false, newCode);
    hasCode.code = code;
    await hasCode.save();
    const newUser = new User({
      fullName: data.fullName,
      phone: data.phone,
      password: bcrypt.hashSync(data.password, BCRYPT_SALT_ROUNDS),
      refer: refInfo._id,
      status: USER_STATUS.ACTIVE,
      code,
      address: data.address,
    });
    // const qrCode = await generateQR(newUser._id);
    const qrCode = await generateQR(newUser.code);
    newUser.qrCode = qrCode;
    const promise = await Promise.all([
      newUser.save(),
      CodeSearch.findOne({ code: newCode })
    ]);
    await createSimAcc(
      promise[0]._id,
      promise[0].fullName,
      promise[0].phone
    );
    if (promise[1]) {
      promise[1].remove();
    }
    await createWallet(promise[0]._id, 'USER', refInfo._id);
    newUser.AddUserToElasticsearch();
    return true;
  } catch (error) {
    logger.error('User register error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function checkCodeToUser(status, code) {
  try {
    if (!status) {
      const promise = await Promise.all([User.findOne({ code: { $regex: code, $options: 'i' } }), findOneBestCodeByCond({ code: code })]);
      if (promise[0] || promise[1]) {
        code++;
        return checkCodeToUser(status, code);
      }
      return code;
    }
    return code;
  } catch (error) {
    return error500(error);
  }
}

/**
 * Register check phone number
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function registerCheckPhone(data) {
  try {
    const hasUser = await User.findOne({ phone: data.phone });
    if (hasUser) {
      return errorMessage(400, ERROR_CODE.PHONE_REGISTERED);
    }
    const code = generateRandom6Digits();
    await Promise.all([
      redisSet(data.phone, code),
      redisExpire(data.phone, REDIS_TIME),
      sendSMS(data.phone, code)
    ]);
    if (DEBUG) return code;
    return true;
  } catch (error) {
    logger.error('User register error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * verify account
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function verifyAccount(data) {
  try {
    const hasUser = await User.findOne({ phone: data.phone });
    if (hasUser) return errorMessage(404, ERROR_CODE.EXISTS);
    const code = await redisGet(data.phone);
    if (!code || code.toString() !== data.code.toString()) return errorMessage(404, ERROR_CODE.CODE_NOT_FOUND);
    return true;
  } catch (error) {
    logger.error('User register error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function sendCode(phone) {
  try {
    const code = await redisGet(phone);
    if (code) {
      if (DEBUG) return code;
      return errorMessage(404, ERROR_CODE.TIME_OUT_INVALID);
    }
    const reCode = generateRandom6Digits();
    await Promise.all([
      redisSet(phone, reCode),
      redisExpire(phone, REDIS_TIME),
      sendSMS(phone, reCode)
    ]);
    if (DEBUG) return reCode;
    return true;
  } catch (err) {
    logger.error('sendCode error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * verify account
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function resendVerifyAccount(data) {
  try {
    const hasUser = await User.findOne({ phone: data.phone, status: USER_STATUS.PENDING });
    if (!hasUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    return sendCode(data.phone);
  } catch (error) {
    logger.error('User register error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * verify code
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function resendCode(data) {
  try {
    return sendCode(data.phone);
  } catch (error) {
    logger.error('resendCode error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserInfoById(userId) {
  try {
    const user = await findOneUserByCondDAO({ _id: userId });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    return user;
  } catch (error) {
    return error500(error);
  }
}

/**
 * Register
 * @param {object} data
 * @returns {Promise.<*>} The user model after register success or an error
 */
export async function updateProfile(userId, data) {
  try {
    const user = await User.findById(userId).select({ password: 0 });
    user.avatar = data?.avatar || user?.avatar;
    user.gender = data.gender;
    user.email = data?.email || user?.email;
    user.identity = data?.identity || user?.identity;
    user.fullName = data?.fullName || user?.fullName;
    user.dob = data?.dob || user?.dob;
    user.address = data?.address || user.address;
    user.registrationDate = data?.registrationDate || user.registrationDate;
    await user.save();
    user.UpdateUserToElasticsearch();
    return user;
  } catch (error) {
    logger.error('User register error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Register
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise.<*>} The user model after change password success or an error
 */
export async function changePassword(userId, currentPassword, newPassword) {
  try {
    const user = await User.findById(userId);
    if (!user) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    const comparePassword = user.comparePassword(currentPassword);
    // eslint-disable-next-line new-cap
    if (!comparePassword) {
      // eslint-disable-next-line new-cap
      return errorMessage(400, ERROR_CODE.PASSWORD_INVALID);
    }
    user.password = bcrypt.hashSync(newPassword, BCRYPT_SALT_ROUNDS);
    await user.save();
    return SUCCESS_CODE.CHANGE_PASSWORD;
  } catch (error) {
    logger.error('User changePassword error', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * check phone number
 * @param options
 * @param {string} options.phoneNumber
 *
 */
export async function checkPhoneNumber(options) {
  try {
    const user = await User.findOne({ phone: options.phone });
    if (user) {
      return errorMessage(400, ERROR_CODE.PHONE_REGISTERED);
    }
    return true;
  } catch (error) {
    logger.error('User checkPhoneNumber error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * checkCodeUser
 * @param options
 * @param {string} options.phoneNumber
 *
 */
export async function checkCodeUser(options) {
  try {
    const user = await User.findOne({ code: options.code });
    if (user) {
      return errorMessage(400, ERROR_CODE.EXISTS);
    }
    const code = await Code.findOne({ code: options.code });
    if (code) {
      return {
        status: SUCCESS_CODE.CODE_EXISTS_ON_LIST,
        price: code.value
      };
    }
    const codeSearch = await CodeSearch.findOne({ code: options.code });
    if (codeSearch) {
      codeSearch.value += PRICE_BUY_STEP;
      await codeSearch.save();
      return {
        data: SUCCESS_CODE.CODE_VALID,
        price: codeSearch.value
      };
    }
    const data = new CodeSearch({
      code: options.code,
      value: PRICE_BUY_CODE
    });
    await data.save();
    return {
      data: SUCCESS_CODE.CODE_VALID,
      price: PRICE_BUY_CODE
    };
  } catch (error) {
    logger.error('User checkPhoneNumber error:', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
export async function generalCodeList() {
  const data = [
    '11111111',
    '22222222',
    '33333333',
    '44444444',
    '55555555',
    '66666666',
    '77777777',
    '88888888',
    '99999999',
    '19999999',
    '29999999',
    '39999999',
    '49999999',
    '59999999',
    '69999999',
    '79999999',
    '89999999',
    '18888888',
    '28888888',
    '38888888',
    '48888888',
    '58888888',
    '68888888',
    '78888888',
    '98888888',
    '17777777',
    '27777777',
    '37777777',
    '47777777',
    '57777777',
    '67777777',
    '87777777',
    '97777777',
    '16666666',
    '26666666',
    '36666666',
    '46666666',
    '56666666',
    '76666666',
    '86666666',
    '96666666',
    '15555555',
    '25555555',
    '35555555',
    '45555555',
    '65555555',
    '75555555',
    '85555555',
    '95555555',
    '14444444',
    '24444444',
    '34444444',
    '54444444',
    '64444444',
    '74444444',
    '84444444',
    '94444444',
    '13333333',
    '23333333',
    '43333333',
    '53333333',
    '63333333',
    '73333333',
    '83333333',
    '93333333',
    '12222222',
    '32222222',
    '42222222',
    '52222222',
    '62222222',
    '72222222',
    '82222222',
    '92222222',
    '21111111',
    '31111111',
    '41111111',
    '51111111',
    '61111111',
    '71111111',
    '81111111',
    '91111111',
    '10000000',
    '20000000',
    '30000000',
    '40000000',
    '50000000',
    '60000000',
    '70000000',
    '80000000',
    '90000000',
    '12999999',
    '12888888',
    '12777777',
    '12666666',
    '12555555',
    '12444444',
    '12333333',
    '12111111',
    '12000000',
    '12111111',
    '12122222',
    '12133333',
    '12144444',
    '12155555',
    '12166666',
    '12177777',
    '12188888',
    '12199999',
    '12100000',
    '12345678',
    '12345679',
    '12345677',
    '12345676',
    '12345675',
    '12345674',
    '12345673',
    '12345672',
    '12345671',
    '12345670',
    '18111111',
    '18222222',
    '18333333',
    '18444444',
    '18555555',
    '18666666',
    '18777777',
    '18999999',
    '18000000',
    '19111111',
    '19222222',
    '19333333',
    '19444444',
    '19555555',
    '19666666',
    '19777777',
    '19888888',
    '19000000',
    '86111111',
    '86222222',
    '86333333',
    '86444444',
    '86555555',
    '86777777',
    '86888888',
    '86999999',
    '86000000',
    '82111111',
    '82333333',
    '82444444',
    '82555555',
    '82666666',
    '82777777',
    '82888888',
    '82999999',
    '82000000',
    '81222222',
    '81333333',
    '81444444',
    '81555555',
    '81666666',
    '81777777',
    '81888888',
    '81999999',
    '81000000',
    '81811111',
    '81822222',
    '81833333',
    '81844444',
    '81855555',
    '81866666',
    '81877777',
    '81899999',
    '81800000',
    '13511111',
    '13522222',
    '13533333',
    '13544444',
    '13555555',
    '13566666',
    '13577777',
    '13588888',
    '13599999',
    '98911111',
    '98922222',
    '98933333',
    '98944444',
    '98955555',
    '98966666',
    '98977777',
    '98988888'
  ];
  const promises = data.map((item) => {
    const newCode = new Code({
      code: item,
      value: 100000
    });
    return newCode.save();
  });
  await Promise.all(promises);
}

export async function getUserCodeService(id) {
  try {
    const user = await findOneUserByCondDAO({ _id: id });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    return user.code;
  } catch (error) {
    return error500(error);
  }
}

export async function checkPhone(data) {
  try {
    const user = await User.findOne({ phone: data.phone, status: USER_STATUS.ACTIVE });
    if (!user) {
      return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    }
    return sendCode(data.phone);
  } catch (error) {
    logger.error(`checkPhone error: ${error}`);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
export async function checkCode(data) {
  try {
    const code = await redisGet(data.phone);
    if (code.toString() !== data.code.toString()) {
      return false;
    }
    return true;
  } catch (error) {
    logger.error(`checkPhone error: ${error}`);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updatePassword(data) {
  try {
    const code = await redisGet(data.phone);
    if (code.toString() !== data.code.toString()) {
      return errorMessage(404, ERROR_CODE.CODE_NOT_FOUND);
    }
    const user = await User.findOne({ phone: data.phone, status: USER_STATUS.ACTIVE });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    user.password = bcrypt.hashSync(data.newPassword, BCRYPT_SALT_ROUNDS);
    await Promise.all([
      user.save(),
      redisDel(data.phone)
    ]);
    return true;
  } catch (error) {
    logger.error(`checkPhone error: ${error}`);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function forgotPassword(step, data) {
  try {
    // eslint-disable-next-line radix
    switch (parseInt(step)) {
      case 1:
        return checkPhone(data);
      case 2:
        return checkCode(data);
      case 3:
        return updatePassword(data);
      default:
        return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    }
  } catch (error) {
    logger.error(`Forgot password error: ${error}`);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function logout(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    await user.update({ online: 0 });
    await StaticReport.updateOne(
      { type: REPORT.STORE_ONL },
      { $inc: { data: -1 } },
      { upsert: true }
    );
    return SUCCESS_CODE.LOGOUT_SUCCESS;
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function changePhoneNumber(id, step, data) {
  try {
    const user = await User.findOne({ phone: data.phone });
    const currentUser = await User.findOne({ _id: id });
    if (user) return errorMessage(400, ERROR_CODE.EXISTS);
    // eslint-disable-next-line radix
    switch (parseInt(step)) {
      case 1:
        return sendCode(data.phone);
      case 2:
        if (await checkCode(data) === true) {
          await User.updateOne(
            { _id: id },
            { $set: { phone: data.phone } }
          );
          const updateNewPhone = await User.findById(id);
          const tempHistoryData = {
            userId: id,
            history: {
              currentPhone: currentUser.phone,
              newPhone: data.phone,
              type: 0,
              createdAt: new Date(Date.now()).toISOString(),
              updatedAt: new Date(Date.now()).toISOString(),
            }
          };
          const countDocumentHistory = await countHistoryPhoneNumberChangeByCond({ userId: id });
          if (!countDocumentHistory) {
            await addHistoryPhoneNumber(tempHistoryData);
          } else {
            await HistoryChangePhoneNumberModel.updateOne(
              { userId: id },
              { $push: { history: tempHistoryData.history } }
            );
          }
          updateNewPhone.UpdateUserToElasticsearch();
          await addSimHistory({
            sim: data.phone,
            userId: updateNewPhone._id
          });
          return updateNewPhone;
        }
        return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
      default:
        return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    }
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}


export async function deleteUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    await user.remove();
    return SUCCESS_CODE.DELETE_SUCCESS;
  } catch (error) {
    logger.error('error deleteUserById', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function searchCode(code) {
  try {
    const isNaN = Number(code);
    if (code.toLowerCase().includes('vetop')) return errorMessage(400, ERROR_CODE.CHARACTER_VETOP_ERROR);
    const hasCode = await findUserByCond({ code: { $regex: code, $options: 'i' } });
    const erArr = [];
    hasCode.forEach((user) => {
      if (user.code.length === code.length) {
        erArr.push(user.code);
      }
    });
    if (erArr.length) return errorMessage(400, ERROR_CODE.CODE_EXISTS);
    let data = await findBestCodeByCondNoQuery({});
    data = data.map(d => d.code.toString());
    if (data.includes(code)) {
      return 'vip';
    }
    if (isNaN !== NaN) {
      if (code < 10) return errorMessage(400, ERROR_CODE.CODE_OF_VETOP);
      let rs = await searchCodeVip(code);
      rs = rs.filter(item => item);
      if (rs.length > 0) {
        return Math.max.apply(Math, rs.map(o => o.value));
      }
    }
    const valueCode = await findOneCodeSearchByCondDAO({ code: code });
    if (!valueCode) {
      await createCodeSearch({ code: code });
      return DEFAULT_VALUE_CODE;
    }
    valueCode.value = (Number(valueCode.value) + DEFAULT_VALUE_CODE);
    await valueCode.save();
    return valueCode.value;
  } catch (error) {
    logger.error('error deleteUserById', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getBestCode(query) {
  try {
    const promise = await Promise.all([countBestCodeByCond({}), findBestCodeByCond({}, query)]);
    return [promise[0], promise[1]];
  } catch (error) {
    logger.error('error deleteUserById', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export async function getValueOfCode(code) {
  try {
    const isNaN = Number(code);
    if (code.toLowerCase().includes('vetop')) return errorMessage(400, ERROR_CODE.CHARACTER_VETOP_ERROR);
    const hasCode = await findUserByCond({ code: { $regex: code, $options: 'i' } });
    const erArr = [];
    hasCode.forEach((user) => {
      if (user.code.length === code.length) {
        erArr.push(user.code);
      }
    });
    if (erArr.length) return errorMessage(400, ERROR_CODE.CODE_EXISTS);
    if (isNaN !== NaN) {
      if (code < 10) return errorMessage(400, ERROR_CODE.CODE_OF_VETOP);
      let rs = await searchCodeVip(code);
      rs = rs.filter(item => item);
      if (rs.length > 0) {
        return Math.max.apply(Math, rs.map(o => o.value));
      }
    }
    const valueCode = await findOneCodeSearchByCondDAO({ code: code });
    if (!valueCode) {
      await createCodeSearch({ code: code });
      return DEFAULT_VALUE_CODE;
    }
    return valueCode.value;
  } catch (error) {
    return error500(error);
  }
}

export async function createPaymentChangeCode(id, code) {
  try {
    const user = await findOneUserByCondDAO({ _id: id });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    user.status = USER_STATUS.WAIT_PAYMENT_CODE;
    const promise = await Promise.all([user.save(), getValueOfCode(code)]);
    if (promise[1] < 500000) {
      await updateNewCodeUserService(id, code);
      return true;
    }
    const payload = await paymentPaymeCreate(id, promise[1], code);
    return payload;
  } catch (error) {
    return error500(error);
  }
}

export async function updateNewCodeUserService(id, code) {
  try {
    const user = await findOneUserByCondDAO({ _id: id });
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const hasCode = await findOneCodeByCond({ value: code });
    if (hasCode) return errorMessage(400, ERROR_CODE.CODE_EXISTS);
    user.code = code;
    user.qrCode = await generateQR(code);
    user.status = USER_STATUS.ACTIVE;
    await user.save();
    user.UpdateUserToElasticsearch();
    await updateCodeNotify(user._id, code);
    return true;
  } catch (error) {
    console.log(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export function checkCodeUserGenerate(options, listCode) {
  try {
    let code;
    if (!options.status) {
      code = generateRandom(1, START_CODE, START_CODE_STRING);
      if (listCode.includes(Number(code))) {
        return checkCodeUser(false, listCode);
      }
      options.status = true;
      options.code = code;
      return options;
    }
    return;
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Profile
 * @param {string} userId
 * @returns {Promise.<*>} The user model after get profile success or an error
 */
export async function profileUser(auth) {
  try {
    let userInfo = await findOneUserByCondDAO({ _id: auth._id });
    userInfo = userInfo.toObject();
    userInfo.avatar = GetFileData(SHARE_HOST, userInfo.avatar);
    const referInfo = await getUserById(userInfo.refer);
    userInfo.referInfo = referInfo?._id ? {
      code: referInfo.code,
      _id: referInfo._id
    } : {};
    if (!userInfo?.defaultStore && auth?.storeId) {
      const storeInfo = await Store.findById(auth.storeId);
      userInfo.storeInfo = {
        _id: storeInfo._id,
        qrCode: storeInfo.qrCode
      };
    }
    if (userInfo?.defaultStore && auth?.storeId) {
      const storeInfo = await Store.findById(userInfo.defaultStore);
      const owner = (storeInfo.userId.toString() === auth._id.toString());
      userInfo.storeInfo = {
        _id: userInfo.defaultStore,
        owner,
        qrCode: storeInfo.qrCode
      };
    }
    if (!userInfo?.defaultStore && !auth?.storeId) {
      userInfo.storeInfo = {};
    }
    return userInfo;
  } catch (error) {
    logger.error('User profileUser error', error);
    throw new APIError(500, 'Internal Server Error');
  }
}

export async function dummyCodeVipRule() {
  try {
    const listRuleVipCode = [
      {
        type: 'SAME_NUMBER',
        rule: [
          { type: 4, value: 500000 },
          { type: 5, value: 2000000 },
          { type: 6, value: 5000000 },
          { type: 7, value: 5000000 },
          { type: 8, value: 1500000 },
          { type: 9, value: 1500000 },
          { type: 10, value: 1500000 },
          { type: 11, value: 1500000 },
          { type: 12, value: 1500000 },
          { type: 13, value: 1500000 },
          { type: 14, value: 1500000 },
          { type: 15, value: 1500000 },
          { type: 16, value: 1500000 },
        ]
      },
      {
        type: 'FIRST_SAME_NUMBER',
        rule: [
          { type: 4, value: 100000 },
          { type: 5, value: 300000 },
          { type: 6, value: 2000000 },
          { type: 7, value: 2000000 },
          { type: 8, value: 3000000 },
          { type: 9, value: 3000000 },
          { type: 10, value: 3000000 },
          { type: 11, value: 3000000 },
          { type: 12, value: 3000000 },
          { type: 13, value: 3000000 },
          { type: 14, value: 3000000 },
          { type: 15, value: 3000000 },
        ]
      },
      {
        type: 'LAST_SAME_NUMBER',
        rule: [
          { type: 4, value: 500000 },
          { type: 5, value: 2000000 },
          { type: 6, value: 5000000 },
          { type: 7, value: 5000000 },
          { type: 8, value: 10000000 },
          { type: 9, value: 10000000 },
          { type: 10, value: 10000000 },
          { type: 11, value: 10000000 },
          { type: 12, value: 10000000 },
          { type: 13, value: 10000000 },
          { type: 14, value: 10000000 },
          { type: 15, value: 10000000 },
        ]
      },
      {
        type: 'FORWARD_NUMBER',
        rule: [
          { type: 3, value: 10000000 },
          { type: 4, value: 10000000 },
          { type: 5, value: 10000000 },
          { type: 6, value: 10000000 },
          { type: 7, value: 10000000 },
          { type: 8, value: 10000000 },
          { type: 9, value: 10000000 },
          { type: 10, value: 50000000 },
        ]
      }
    ];
    const nums = await countCodeVipByCond();
    if (!nums) {
      await createManyCodeVipDAO(listRuleVipCode);
    }
    return true;
  } catch (error) {
    return error500(error);
  }
}

export async function dummyBestCode() {
  try {
    const data = [
      { code: '11111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '22222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '33333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '44444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '55555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '66666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '77777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '88888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '99999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '29999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '39999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '49999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '59999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '69999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '79999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '89999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '28888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '38888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '48888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '58888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '68888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '78888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '17777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '27777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '37777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '47777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '57777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '67777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '87777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '97777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '16666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '26666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '36666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '46666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '56666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '76666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '96666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '15555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '25555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '35555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '45555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '65555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '75555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '85555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '95555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '14444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '24444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '34444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '54444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '64444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '74444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '84444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '94444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '23333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '43333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '53333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '63333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '73333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '83333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '93333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '32222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '42222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '52222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '62222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '72222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '92222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '21111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '31111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '41111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '51111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '61111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '71111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '91111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '10000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '20000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '30000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '40000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '50000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '60000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '70000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '80000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '90000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12122222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12133333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12144444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12155555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12166666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12177777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12188888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12199999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12100000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345678', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345679', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345677', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345676', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345675', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345674', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345673', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345672', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345671', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '12345670', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '18000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '19000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '86000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82111111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '82000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81222222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81333333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81444444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81666666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81777777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81888888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81999999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81000000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81811111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81822222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81833333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81844444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81855555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81866666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81877777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81899999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '81800000', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13511111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13522222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13533333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13544444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13555555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13566666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13577777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13588888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '13599999', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98911111', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98922222', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98933333', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98944444', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98955555', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98966666', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98977777', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
      { code: '98988888', rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên' },
    ];
    const nums = await countBestCodeByCond({});
    if (!nums) {
      await createManyBestCode(data);
      return true;
    }
    return true;
  } catch (error) {
    return error500(error);
  }
}

export async function deleteCodeVip() {
  try {
    return await deleteManyCodeVip();
  } catch (error) {
    return error500(error);
  }
}

export async function searchUser(auth, text, query) {
  try {
    // const dataBuilder = userSearchBuilder(query.limit, query.skip, text, [1012, 1013]);
    // const data = await UserElasticsearch.SearchElement(UserPayload.index, dataBuilder);
    let conditions;
    if (text) {
      conditions = [
        { email: { $regex: text, $options: 'i' } },
        { phone: { $regex: text, $options: 'i' } },
        { code: { $regex: text, $options: 'i' } },
      ];
    }

    let user = await findStaffByCondPopulate({ storeId: toObjectIdFromId(auth.storeId) }, { $or: conditions });
    if (user.length > 0) {
      user = user.filter(item => item?.userId !== null);
    }
    return user;
  } catch (error) {
    console.log(error);
    return error500(error);
  }
}

export async function searchAllUser(query, storeId, userId) {
  try {
    const condition = {
      code: query || '',
      _id: { $nin: [userId] },
      statusInvite: true
    };
    const payload = await findOneUserByCondDAO(condition);
    if (!payload) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const staff = await findOneStaff({ userId: payload._id });
    if (staff?._id && staff.storeId.toString() === storeId) {
      switch (staff.status) {
        case STAFF_STATUS.APPROVE:
          return errorMessage(403, ERROR_CODE.STAFF_EXISTS);
        case STAFF_STATUS.PENDING:
          return errorMessage(403, ERROR_CODE.STAFF_REQUEST_EXISTS);
        case STAFF_STATUS.BLOCK:
          return errorMessage(403, ERROR_CODE.STAFF_BLOCKED);
        default:
          break;
      }
    }
    return payload;
  } catch (error) {
    return error500(error);
  }
}

export async function getInfoQRService(auth) {
  try {
    if (auth?.storeId) {
      const hasStore = await Store.findById(auth.storeId);
      if (!hasStore) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
      return {
        name: hasStore.name,
        code: hasStore.code,
        // qrCode: hasStore.qrCode ? hasStore.qrCode : await generateQR(auth.storeId)
        qrCode: hasStore.qrCode ? hasStore.qrCode : await generateQR(hasStore.code)
      };
    }
    const hasUser = await User.findById(auth._id);
    if (!hasUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    return {
      fullName: hasUser.fullName,
      code: hasUser.code,
      // qrCode: hasUser.qrCode ? hasUser.qrCode : await generateQR(auth._id)
      qrCode: hasUser.qrCode ? hasUser.qrCode : await generateQR(hasUser.code)
    };
  } catch (error) {
    logger.error(error);
    return error500(error);
  }
}

export async function changePhoneFromSim(user, data) {
  try {
    const profile = await findOneUserByCondDAO({ _id: user._id });
    if (!profile) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const checkOTP = await redisGet(data.sim);
    if (!checkOTP) return errorMessage(403, ERROR_CODE.CODE_NOT_FOUND);
    if (checkOTP.toString() !== data.code.toString()) return errorMessage(403, ERROR_CODE.CODE_NOT_FOUND);
    const walletSim = await getWalletSim(data.sim);
    if (!walletSim._id) {
      const checkSim = await findOneUserByCondDAO({ phone: data.sim });
      if (checkSim) return errorMessage(403, ERROR_CODE.PHONE_REGISTERED);
      profile.phone = data.sim;
      await Promise.all([
        profile.save(),
        addSimHistory({
          sim: data.sim,
          userId: profile._id
        })
      ]);
      await profile.save();
      return profile;
    }
    profile.phone = data.sim;
    await Promise.all([
      updateWalletFromSim(user._id, data.sim, user.storeId ? 'STORE' : 'USER', walletSim.vetic, walletSim.pin, walletSim.tax, walletSim.stock, walletSim.money),
      profile.save(),
      addSimHistory({
        sim: data.sim,
        userId: profile._id
      })
    ]);
    return profile;
  } catch (error) {
    return error500(error);
  }
}

export async function getChangeSimHistory(user, query) {
  try {
    const sort = getSort(query);
    const promise = await Promise.all([getTotalSimHistories({ userId: user._id }), getSimHistories({ userId: user._id }, query, sort)]);
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}

export async function changeStatusInvite(auth, status) {
  try {
    const user = await getUserById(auth._id);
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    user.statusInvite = status;
    await user.save();
    return user;
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getNotificationChangeCode() {
  try {
    const noti = await getSettingGeneralDAO({ type: SETTINGS_GENERAL_USER.STATUS_CHANGE_CODE_FREE });
    return noti;
  } catch (error) {
    return error500(error);
  }
}

export async function searchCodeTracking() {
  try {
    const listCodeSearch = await getCodeSearch({}, {});
    const timeNow = new Date();
    listCodeSearch.forEach(async (element, index) => {
      const time = new Date(element.updatedAt);
      const diff = timeNow - time;
      console.log(timeNow, time, diff, index, 60e3);
      console.log(Math.floor(diff / 60e3), 'minutes ago');
      if (Math.floor(diff / 60e3) >= 1440) {
        await element.remove();
      }
    });
    return listCodeSearch;
  } catch (error) {
    return error500(error);
  }
}
