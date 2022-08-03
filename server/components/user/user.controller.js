/* eslint-disable guard-for-in */
import { DEFAULT_GENDER } from '../../../external/constants/constants';
import * as UserService from './user.service';
import { commonGetQuery, GetSort } from '../../../external/middleware/query';

export async function Pong(req, res) {
  try {
    return res.json({
      success: true,
      msg: 'PONG',
    });
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function login(req, res) {
  try {
    const { body } = req;
    const { type } = req.params;
    const user = await UserService.login(body.phone, body.password, type);
    return res.RH.success(user);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateDefaultShop(req, res) {
  try {
    const storeId = req.body.storeId;
    const { user } = req;
    const payload = await UserService.updateDefaultShop(storeId, user._id);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStoreUser(req, res) {
  try {
    const type = req.query.type;
    const query = commonGetQuery(req);
    const { user } = req;
    const payload = await UserService.getStoreUser(user, type, query);
    return res.RH.paging(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function profileUser(req, res, next) {
  try {
    const { user } = req;
    return res.json({
      success: true,
      payload: await UserService.profileUser(user)
    });
  } catch (error) {
    return next(error);
  }
}

export async function register(req, res) {
  try {
    const { body } = req;
    const { type } = req.params;
    await UserService.register(body);
    const user = await UserService.login(body.phone, body.password, type);
    return res.RH.success(user);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function registerCheckPhone(req, res) {
  try {
    return res.RH.success(await UserService.registerCheckPhone(req.body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function verifyAccount(req, res) {
  try {
    return res.RH.success(await UserService.verifyAccount(req.body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function resendVerifyAccount(req, res) {
  try {
    return res.RH.success(await UserService.resendVerifyAccount(req.body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function resendCode(req, res) {
  try {
    return res.RH.success(await UserService.resendCode(req.body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserInfoById(req, res) {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserInfoById(userId);
    return res.RH.success(user);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateProfile(req, res) {
  try {
    const { user } = req;
    await UserService.updateProfile(user._id, req.body);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function uploadUserAvatar(req, res) {
  try {
    const { user } = req;
    const { avatar } = req.body;
    await UserService.uploadUserAvatar(user, avatar);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changePassword(req, res) {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;
    const { user } = req;
    await UserService.changePassword(user._id, currentPassword, newPassword);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function checkCodeUser(req, res) {
  try {
    const options = req.body;
    const data = await UserService.checkCodeUser(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function generalCodeList(req, res) {
  try {
    await UserService.generalCodeList();
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserCode(req, res) {
  try {
    const id = req.user._id;
    const payload = await UserService.getUserCodeService(id);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function checkPhoneNumber(req, res) {
  try {
    const options = req.body;
    const data = await UserService.checkPhoneNumber(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function forgotPassword(req, res) {
  try {
    const { step } = req.params;
    return res.RH.success(await UserService.forgotPassword(step, req.body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function logout(req, res) {
  try {
    const { user } = req;
    const logoutUser = await UserService.logout(user._id);
    return res.RH.success(logoutUser);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changePhoneNumber(req, res) {
  try {
    const { user, body } = req;
    const { step } = req.params;
    return res.RH.success(await UserService.changePhoneNumber(user._id, step, body));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteUserById(req, res) {
  try {
    return res.RH.success(await UserService.deleteUserById(req.params.id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchCode(req, res) {
  try {
    return res.RH.success(await UserService.searchCode(req.query.code));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateNewCodeUser(req, res) {
  try {
    const id = req.user._id;
    const code = req.body.code;
    const updateCode = await UserService.createPaymentChangeCode(id, code);
    return res.RH.success(updateCode);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getGender(req, res) {
  try {
    return res.RH.success(DEFAULT_GENDER);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getBestCode(req, res) {
  try {
    const query = commonGetQuery(req);
    return res.RH.paging(await UserService.getBestCode(query), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function dummyCodeVipRule(req, res) {
  try {
    return res.RH.success(await UserService.dummyCodeVipRule());
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function dummyBestCode(req, res) {
  try {
    return res.RH.success(await UserService.dummyBestCode());
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteCodeVip(req, res) {
  try {
    return res.RH.success(await UserService.deleteCodeVip());
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchUser(req, res) {
  try {
    const query = commonGetQuery(req);
    const { user } = req;
    const payload = await UserService.searchUser(user, req.query.text, query);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchAllUser(req, res) {
  try {
    const { user } = req;
    const payload = await UserService.searchAllUser(req.query.text, user.storeId, user._id);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getInfoQR(req, res) {
  try {
    const auth = req.user;
    const payload = await UserService.getInfoQRService(auth);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changePhoneFromSim(req, res) {
  try {
    const { user } = req;
    const { body } = req;
    const payload = await UserService.changePhoneFromSim(user, body);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getChangeSimHistory(req, res) {
  try {
    const { user } = req;
    const query = commonGetQuery(req);
    const payload = await UserService.getChangeSimHistory(user, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changeStatusInvite(req, res) {
  try {
    const { user } = req;
    const { status } = req.body;
    await UserService.changeStatusInvite(user, status);
    return res.RH.success(true);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getNotificationChangeCode(req, res) {
  try {
    const payload = await UserService.getNotificationChangeCode();
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchCodeTracking(req, res) {
  try {
    const payload = await UserService.searchCodeTracking();
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
