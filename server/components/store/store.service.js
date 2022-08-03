import QRCode from 'qrcode';
import logger from '../../api/logger';
import Store from './store.model';
import User from '../user/user.model';
import Country from '../country/country.model';
import Zone from '../state/state.model';
import { error500, errorMessage } from '../../../external/util/error';
import {
  ERROR_CODE, SHARE_HOST, STAFF_STATUS, SUCCESS_CODE, TYPE_RATING, WALLET_TYPE
} from '../../../external/constants/constants';
import { createCategoriesStore, createSimAcc, getCategories, getCategoriesInArray, getCommentRatingByIdStore, getProductsToStore, getRatingGRPC, getTotalProduct } from '../../../internal/grpc/store/request';
import {
  findStoreLocationDAO, findStoreLocationUnlimitDAO, getStoreById, countStoreLocationDAO, findStoreByCond, findStoreLocationNoneMaxDistanceDAO, countStoreByCond
} from './store.dao';
import { countStaffByCond, findOneStaff, findStaffByCond } from '../staff/staff.dao';
import { sendNotification } from '../notification/notification.service';
import { NOTIFICATION_TYPE } from '../../../external/constants/job_name';
import { getSort } from '../../../external/middleware/query';
import { findOneUserByCondDAO, getUserById } from '../user/user.dao';
import { findOneStateByCond } from '../state/state.dao';
import { findOneCountryByCond } from '../country/country.dao';
import { countFollowByCond, findOneFollowByCond } from '../followers/follow.dao';
import { GetFileData } from '../../../external/util/file';
import { createWallet } from '../../../internal/grpc/wallet/request';
import { toObjectIdFromId } from '../../helpers/help.helper';
import { STORE_STATUS } from '../../constants';
import { createStoreLocation, findOneStoreLocationByCond, findStoreLocationByCond, coundStoreLocationByCond } from './location.dao';
import { getMetaDataStoreLocation } from './location.service';
import slug from 'slug';
import { getFollowers } from '../followers/followers.service';
import { civicinfo } from 'googleapis/build/src/apis/civicinfo';
import districtModel from '../state/district.model';

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
 * Update Store Information
 * @param {Object} body
 * @param {Object} auth
 * @returns {Promise.<*>} The user model after update teacher information success or an error
 */
export async function updateStore(body, auth) {
  try {
    // StoreId get in JWT when login with type = store
    const store = await Store.findById(auth.storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    if (body.country) {
      const country = await Country.findById(body.countryId).lean();
      if (!country) return errorMessage(404, ERROR_CODE.COUNTRY_INVALID);
    }
    if (body.stateId) {
      const state = await Zone.findById(body.stateId).lean();
      if (!state) return errorMessage(404, ERROR_CODE.ZONE_INVALID);
    }
    if (body.districtId) {
      const district = await districtModel.findById(body.districtId).lean();
      if (!district) return errorMessage(404, ERROR_CODE.DISTRICT_INVALID);
    }
    store.name = body?.name || store.name;
    store.description = body?.description || store.description;
    store.address = body?.address || store.address;
    store.phone = body?.phone || store.phone;
    store.countryId = body?.countryId || store.countryId;
    store.districtId = body?.districtId || store.districtId;
    store.stateId = body?.stateId || store.stageId;
    store.loc = body?.loc || store.loc;
    store.email = body?.email || store.email;
    store.company = {
      taxCode: body?.company?.taxCode || store.company.taxCode,
      name: body?.company?.name || store.company.name,
      founded: body?.company?.founded || store.company.founded,
      founder: body?.company?.founder || store.company.founder,
      industry: body?.company?.industry || store.company.industry
    };
    const storeLocation = await findOneStoreLocationByCond({ storeId: auth.storeId, status: true });
    if (storeLocation) {
      storeLocation.address = body?.address || store.address;
      storeLocation.countryId = body?.countryId || store.countryId;
      storeLocation.stateId = body?.stateId || store.stageId;
      storeLocation.districtId = body?.districtId || store.districtId;
      storeLocation.name = body?.name || store.name;
      storeLocation.phone = body?.phone || store.phone;
      storeLocation.loc = { type: 'Point', coordinates: body?.loc || store.loc };
      storeLocation.save();
    } else {
      await createStoreLocation({
        name: store.name,
        stateId: store.stateId,
        countryId: store.countryId,
        districtId: store.districtId,
        address: store.address,
        phone: store.phone,
        status: true,
        storeId: store._id._id,
        loc: store.loc
      });
    }
    store.UpdateStoreToElasticSearch();
    await store.save();
    return store;
  } catch (error) {
    logger.error(`Update store infor error: ${error}`);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updateAvatarStore(body,) {
  try {
    const store = await Store.findById(body.storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    store.avatar = {
      name: body.avatar?.name || '',
      large: body.avatar?.large || '',
      small: body.avatar?.small || '',
      medium: body.avatar?.medium || ''
    };
    store.UpdateStoreToElasticSearch();
    return await store.save();
  } catch (error) {
    return error500(error);
  }
}

/**
 * Create Store Information
 * @param {ObjectId} userId
 * @param {string} name
 * @param {string} description
 * @param {string} address
 * @param {string} phone
 * @param {ObjectId} countryId
 * @param {ObjectId} zoneId
 * @param {ObjectId} districtId
 * @param {object} company
 * @returns {Promise.<*>} The user model after create store information success or an error
 */
export async function createStore(data, userId) {
  try {
    const hasStore = await Store.find({ userId });
    if (hasStore.length > 0) return errorMessage(400, ERROR_CODE.STORE_IS_EXIST);
    // 1 user only 1 store
    const user = await User.findById(userId).lean();
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const country = await Country.findById(data.countryId).lean();
    if (!country) return errorMessage(404, ERROR_CODE.COUNTRY_INVALID);
    const zone = await Zone.findById(data.stateId).lean();
    if (!zone) return errorMessage(404, ERROR_CODE.ZONE_INVALID);
    const district = await districtModel.findById(data.districtId);
    if (!district) return errorMessage(404, ERROR_CODE.DISTRICT_INVALID);
    const storeInfo = new Store({
      userId,
      code: user.code,
      name: data.name,
      description: data.description,
      address: data.address,
      phone: data.phone,
      countryId: data.countryId,
      stateId: data.stateId,
      districtId: data.districtId,
      loc: { type: 'Point', coordinates: data.loc },
      storeCategories: [],
      company: {
        taxCode: data?.company?.taxCode || '',
        name: data?.company?.name || '',
        founded: data?.company?.founded || '',
        founder: data?.company?.founder || '',
        industry: data?.company.industry || ''
      }
    });
    const qrCode = await generateQR(user.code);
    storeInfo.qrCode = qrCode;
    await Promise.all([
      storeInfo.save(),
      createWallet(storeInfo._id, 'STORE'),
      createStoreLocation({
        name: data.name,
        stateId: data.stateId,
        countryId: data.countryId,
        districtId: data.districtId,
        address: data.address,
        phone: data.phone,
        status: true,
        storeId: storeInfo._id,
        loc: storeInfo.loc
      }),
      createSimAcc(
        storeInfo._id,
        storeInfo.name,
        storeInfo.phone
      )
    ]);
    // grpc create categories
    createCategoriesStore(storeInfo._id, data.categories);
    storeInfo.AddProductToElasticSearch();
    return storeInfo;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Get Store info by id
 * @param {*} id
 */
export async function getStoreInfo(id, userId, query) {
  try {
    const isFollow = await findOneFollowByCond({ storeId: id, userId });
    if (query?.lat && query?.lng) {
      const store = await findStoreLocationNoneMaxDistanceDAO({ _id: toObjectIdFromId(id) }, { lat: parseFloat(query.lat), lng: parseFloat(query.lng) });
      if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
      const promise = await Promise.all([getMetaDataStore(store, true), countFollowByCond({ storeId: store._id })]);
      promise[0][0].isFollow = !!isFollow;
      promise[0][0].totalFollow = promise[1];
      const user = await findOneUserByCondDAO({ _id: promise[0][0].userId.refer });
      promise[0][0].referId = user?.code || '';
      return promise[0];
    }
    const store = await Store.findById(id);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const promise = await Promise.all([getMetaDataStore(store), countFollowByCond({ storeId: store._id })]);
    promise[0].isFollow = !!isFollow;
    promise[0].totalFollow = promise[1];
    const user = await findOneUserByCondDAO({ _id: promise[0].userId.refer });
    promise[0].referId = user?.code || '';
    return promise[0];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * 
 * @param {*} code 
 * @param {*} userId 
 * @param {*} query 
 * @returns 
 */
export async function getStoreInfoByCode(code, userId, userAuth, query) {
  try {
    let isFollow;
    const storeFollow = await Store.findOne({ code });
    if (!storeFollow) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    if (userAuth?.storeId) {
      isFollow = await findOneFollowByCond({ storeId: userAuth?.storeId, userId });
    } else {
      isFollow = await findOneFollowByCond({ storeId: storeFollow._id, userId });
    }
    if (query?.lat && query?.lng) {
      const store = await findStoreLocationNoneMaxDistanceDAO({ _id: toObjectIdFromId(storeFollow._id) }, { lat: parseFloat(query.lat), lng: parseFloat(query.lng) });
      if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
      const promise = await Promise.all([getMetaDataStore(store, true), countFollowByCond({ storeId: store._id })]);
      promise[0][0].isFollow = !!isFollow;
      promise[0][0].totalFollow = promise[1];
      const user = await findOneUserByCondDAO({ _id: promise[0][0].userId.refer });
      promise[0][0].referId = user?.code || '';
      return promise[0];
    }
    const promise = await Promise.all([getMetaDataStore(storeFollow), countFollowByCond({ storeId: storeFollow._id })]);
    promise[0].isFollow = !!isFollow;
    promise[0].totalFollow = promise[1];
    const user = await findOneUserByCondDAO({ _id: promise[0].userId.refer });
    promise[0].referId = user?.code || '';
    return promise[0];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * get all Store from database
 * @param {*} options option pagination, sort in query
 */
export async function getStores(options, userId, type) {
  try {
    const conditions = {
      status: STORE_STATUS.ACTIVE,
      totalProduct: { $gt: 0 }
    };
    const match = {};
    if (options.keyword) {
      conditions.$or = [
        {
          name: { $regex: options.keyword, $options: 'i' }
        },
        {
          description: { $regex: options.keyword, $options: 'i' }
        },
        {
          phone: { $regex: options.keyword, $options: 'i' }
        },
        {
          address: { $regex: options.keyword, $options: 'i' }
        },
        {
          code: { $regex: options.keyword, $options: 'i' }
        }
      ];
    }
    if (options.categories) {
      options.categories = options.categories.split(',');
      match.match = { storeCategories: { $in: options.categories } };
    }
    const sort = getSort(options);
    if (options?.lng && options?.lat) {
      const maxDistance = parseInt(options?.maxDistance) || 5000; // 5 km
      let results;
      if (type === 'all') {
        results = await Promise.all([
          countStoreLocationDAO(conditions, match, { lat: parseFloat(options.lat), lng: parseFloat(options.lng) }, maxDistance),
          findStoreLocationDAO(conditions, match, { lat: parseFloat(options.lat), lng: parseFloat(options.lng) }, options, sort, maxDistance)
        ]);
      } else {
        results = await Promise.all([
          countStoreLocationDAO(conditions, match, { lat: parseFloat(options.lat), lng: parseFloat(options.lng) }, maxDistance),
          findStoreLocationUnlimitDAO(conditions, match, { lat: parseFloat(options.lat), lng: parseFloat(options.lng) }, options, sort, maxDistance)
        ]);
      }
      results[1] = results[1].map(async (item) => {
        if (options?.categories) {
          item.storeCategories.forEach((storeCategory, i) => {
            if (options.categories.indexOf(item.storeCategories[i]) === -1) {
              delete item.storeCategories[i];
            }
          });
        }
        const isFollow = await findOneFollowByCond({ storeId: item._id, userId });
        item.isFollow = !!isFollow;
        return item;
      });

      const payload = await Promise.all(results[1]);
      return [results[0].length, await getMetaDataStore(payload, true)];
    }
    if (options?.categories) {
      conditions.storeCategories = { $in: options.categories };
    }
    const results = await Promise.all([
      Store.countDocuments(conditions),
      Store.find(conditions).sort(sort).limit(options.limit).skip(options.skip)
    ]);
    results[1] = results[1].map(async (item) => {
      item = item.toObject();
      if (options?.categories) {
        item.storeCategories.forEach((storeCategory, i) => {
          if (options.categories.indexOf(item.storeCategories[i]) === -1) {
            delete item.storeCategories[i];
          }
        });
      }
      const isFollow = await findOneFollowByCond({ storeId: item._id, userId });
      item.isFollow = !!isFollow;
      return item;
    });
    const payload = await Promise.all(results[1]);
    return [results[0], await getMetaDataStore(payload, true)];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getMetaDataStore(store, agg) {
  try {
    const isArray = Array.isArray(store);
    if (!isArray) {
      store = [store];
    }
    store = store.map(async (sto) => {
      if (!agg) {
        sto = sto.toObject();
      }
      if (sto?.avatar) {
        sto.avatar = GetFileData(SHARE_HOST, sto.avatar);
      }
      if (sto?.storeCategories.length) {
        let data = await getCategoriesInArray(JSON.stringify(sto.storeCategories));
        if (data) {
          data = data?.item.map((categories) => {
            categories.icon = GetFileData(SHARE_HOST, JSON.parse(categories.icon));
            return categories;
          });
          sto.storeCategories = data;
        } else {
          sto.storeCategories = [];
        }
      }
      if (sto?.districtId) {
        sto.districtId = await districtModel.findById(sto.districtId) || '';
      }
      if (sto?.userId) {
        const userInfo = await findOneUserByCondDAO({ _id: sto.userId });
        if (!userInfo) {
          sto.userId = {};
        } else {
          userInfo.avatar = GetFileData(SHARE_HOST, userInfo.avatar);
          sto.userId = userInfo;
        }
      }
      if (sto?.countryId) {
        const countryInfo = await findOneCountryByCond({ _id: sto.countryId });
        sto.countryId = countryInfo || {};
      }
      if (sto?.stateId) {
        const stateInfo = await findOneStateByCond({ _id: sto.stateId });
        sto.stateId = stateInfo || {};
      }
      sto.totalOption = await getTotalProduct(sto._id);
      return sto;
    });
    const promise = await Promise.all(store);
    return isArray ? promise : promise[0];
  } catch (error) {
    return error500(error);
  }
}

export async function getStoreCategory(storeId) {
  try {
    const data = await Promise.all([getStoreById(storeId), getCategories()]);
    data[0].storeCategories.forEach((store, i) => {
      data[1].item.forEach((d) => {
        if (data[0].storeCategories[i].toString() === d._id.toString()) {
          data[0].storeCategories[i] = d;
        }
      });
    });
    return data[0];
  } catch (error) {
    return error500(error);
  }
}

export async function getListStoreInvite(userId, query) {
  try {
    const promise = await Promise.all([findStaffByCond({ userId, status: STAFF_STATUS.PENDING }, query), countStaffByCond({ userId, status: STAFF_STATUS.PENDING })]);
    if (promise[1]) {
      const result = promise[0].map(async (item) => {
        item = item.toObject();
        item.storeId = await getStoreById(item.storeId);
        if (item?.storeId?.avatar) {
          item.storeId.avatar = GetFileData(SHARE_HOST, item.storeId.avatar);
        }
        return item;
      });
      const data = await Promise.all(result);
      return [promise[1], data];
    }
    return [promise[1], promise[0]];
  } catch (error) {
    return error500(error);
  }
}

export async function acceptOrRejectStoreInvice(requestId, auth, status) {
  try {
    const hasInvite = await findOneStaff({ _id: requestId, status: STAFF_STATUS.PENDING, userId: auth._id });
    if (!hasInvite) return errorMessage(404, ERROR_CODE.INVITE_NOT_FOUND);
    const store = await getStoreById(hasInvite.storeId);
    if (!Object.values(STAFF_STATUS).includes(parseInt(status))) return errorMessage(403, ERROR_CODE.STATUS_INVALID);
    if (status === STAFF_STATUS.APPROVE) {
      hasInvite.status = status;
      await hasInvite.save();
      await sendNotification({
        targetId: store._id,
        to: store.userId,
        data: {
          storeName: store.name,
          sender: auth.fullName
        },
        type: NOTIFICATION_TYPE.ACCEPT_STORE_INVITE
      });
      return SUCCESS_CODE.ACCEPT_STORE_INVITE_SUCCESS;
    }
    await sendNotification({
      targetId: store._id,
      to: store.userId,
      data: {
        storeName: store.name,
        sender: auth.fullName
      },
      type: NOTIFICATION_TYPE.REJECT_STORE_INVITE
    });
    hasInvite.remove();
    return SUCCESS_CODE.REJECT_STORE_INVITE_SUCCESS;
  } catch (error) {
    return error500(error);
  }
}

export async function searchStoreByLocation(query) {
  try {
    const cond = {};
    const loc = {};
    if (query?.stageId) {
      cond.stageId = query.stageId;
    }
    if (query?.categories) {
      if (!Array.isArray(query.categories)) {
        query.categories = query.categories.split(',');
      }
    }
    if (query?.lat && query?.lng) {
      loc.lat = Number(query.lat);
      loc.lng = Number(query.lng);
    }
    const sort = getSort(query);
    const promise = await Promise.all([countStoreLocationDAO(cond, loc), findStoreLocationDAO(cond, loc, query, sort)]);
    return [promise[0].length, promise[1]];
  } catch (error) {
    return error500(error);
  }
}

export async function updateStoreCategories(body, storeId) {
  try {
    const store = await getStoreById(storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    if (!Array.isArray(body.storeCategories)) {
      body.storeCategories = [body.storeCategories];
    }
    let categories = await getCategories();
    categories = categories.map(cat => cat._id.toString());
    body.categories.forEach((cat, inx) => {
      if (!categories.includes(body.categories[inx])) {
        return errorMessage(404, ERROR_CODE.CATEGORY_NOT_FOUND);
      }
    });
    store.storeCategories = body.storeCategories;
    await store.save();
    store.UpdateStoreToElasticSearch();
    return store;
  } catch (error) {
    return error500(error);
  }
}

export async function getRatingStoreProductById(type, id, query) {
  try {
    const sort = getSort(query);
    type = parseInt(type);
    if (!Object.values(TYPE_RATING).includes(type)) return errorMessage(404, ERROR_CODE.TYPE_RATING_INVALID);
    const data = await getRatingGRPC(id, type, query.limit, query.skip, JSON.stringify(sort));
    const promise = data.item.map(async (rating) => {
      const userInfo = await getUserById(rating.userId);
      userInfo.avatar = GetFileData(SHARE_HOST, userInfo.avatar);
      rating.userId = userInfo || {};
      return rating;
    });
    const result = await Promise.all(promise);
    return [data.page, result];
  } catch (error) {
    return error500(error);
  }
}

export async function searchStore(query) {
  try {
    const sort = getSort(query);
    query.keyword = slug(query?.keyword || ' ', ' ');
    const promise = await Promise.all([countStoreByCond({ searchString: { $regex: query.keyword, $options: 'i' } }), findStoreByCond({ searchString: { $regex: query.keyword, $options: 'i' } }, query, sort)]);
    promise[1] = await getMetaDataStore(promise[1]);
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}

export async function getStoreLocationByToken(storeId, query) {
  try {
    const sort = getSort(query);
    const store = await getStoreById(storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const promise = await Promise.all([coundStoreLocationByCond({ storeId }), findStoreLocationByCond({ storeId }, query, sort)]);
    return [promise[0], await getMetaDataStoreLocation(promise[1])];
  } catch (error) {
    return error500(error);
  }
}

export async function updateStaffInfo(user, body) {
  try {
    const staff = await findOneStaff({ _id: body.staffId });
    if (!staff) return errorMessage(404, ERROR_CODE.STAFF_NOT_FOUND);
    if (staff.storeId.toString() !== user.storeId.toString()) return errorMessage(403, ERROR_CODE.STORE_NOT_FOUND);
    staff.paymentLimit = parseInt(body?.value) || staff.value;
    if (body?.status) {
      if (!Object.values(STAFF_STATUS).includes(parseInt(body.status))) return errorMessage(403, ERROR_CODE.STATUS_INVALID);
      staff.status = body.status;
    }
    await staff.save();
    return staff;
  } catch (error) {
    return error500(error);
  }
}

export async function getPaymentLimitStaff(user) {
  try {
    console.log(user);
    return true;
  } catch (error) {
    return error500(error);
  }
}
