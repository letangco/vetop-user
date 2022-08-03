import * as StoreService from './store.service';
import * as StoreStaffService from './store.staff.service';
import * as LocationService from './location.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function updateStore(req, res) {
  try {
    const { body, user } = req;
    const payload = await StoreService.updateStore(body, user);
    return res.RH.success(payload);
  } catch (error) {
    console.log(error);
    return res.RH.error(error);
  }
}

export async function updateAvatarStore(req, res) {
  try {
    const { body, user } = req;
    const payload = await StoreService.updateAvatarStore(body, user);
    return res.RH.success(payload);
  } catch (error) {
    console.log(error);
    return res.RH.error(error);
  }
}

export async function createStore(req, res) {
  try {
    const { user } = req;
    const payload = await StoreService.createStore(req.body, user._id);
    return res.RH.success(payload);
  } catch (error) {
    console.log(error);
    return res.RH.error(error);
  }
}

export async function getStore(req, res) {
  try {
    const id = req?.user?.storeId || req.params.id;
    const userId = req?.user?._id;
    const query = commonGetQuery(req);
    return res.RH.success(await StoreService.getStoreInfo(id, userId, query));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStoreDetailByCode(req, res) {
  try {
    const { code } = req.params;
    const userId = req?.user?._id;
    const { user } = req;
    const query = commonGetQuery(req);
    return res.RH.success(await StoreService.getStoreInfoByCode(code, userId, user, query));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStores(req, res) {
  try {
    const query = commonGetQuery(req);
    const userId = req?.user?._id || null;
    return res.RH.paging(await StoreService.getStores(query, userId, req.query.type), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function getStaffs(req, res) {
  try {
    const query = commonGetQuery(req);
    const { user } = req;
    return res.RH.paging(await StoreStaffService.getStaffs(user, query), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function getStaff(req, res) {
  try {
    const id = req?.user?.staffId || req.params.id;
    return res.RH.success(await StoreStaffService.getStaffInfo(id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getPaymentLimitStaff(req, res) {
  try {
    const id = req?.user?.staffId;
    return res.RH.success(await StoreStaffService.getStaffInfo(id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteStaff(req, res) {
  try {
    const id = req?.user?.staffId || req.params.id;
    const payload = await StoreStaffService.deleteStaff(id);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function createStaff(req, res) {
  try {
    const { user } = req;
    const { userId, value } = req.body;
    const payload = await StoreStaffService.createStaff(user, userId, value);
    return res.RH.success(payload);
  } catch (error) {
    console.log(error);
    return res.RH.error(error);
  }
}

export async function getLocations(req, res) {
  try {
    const query = commonGetQuery(req);
    return res.RH.paging(await LocationService.getLocations(query), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function getLocation(req, res) {
  try {
    const { id } = req.params;
    return res.RH.success(await LocationService.getLocation(id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateStoreLocationDefault(req, res) {
  try {
    const { storeId } = req.user;
    const { storeLocationId } = req.body;
    const payload = await LocationService.updateStoreLocationDefault(storeId, storeLocationId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateStoreLocation(req, res) {
  try {
    const body = req.body;
    body.storeId = req.user.storeId;
    const payload = await LocationService.updateStoreLocation(body);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function removeStoreLocation(req, res) {
  try {
    const id = req.params.id;
    await LocationService.removeStoreLocation(id);
    return res.RH.success(true);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getListStoreInvite(req, res) {
  try {
    const userId = req.user._id;
    const query = commonGetQuery(req);
    const payload = await StoreService.getListStoreInvite(userId, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function acceptOrRejectStoreInvice(req, res) {
  try {
    const { status, requestId } = req.body;
    const { user } = req;
    const payload = await StoreService.acceptOrRejectStoreInvice(requestId, user, status);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteLocation(req, res) {
  try {
    const id = req?.user?.staffId;
    await LocationService.deleteLocation(id);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}
export async function createLocation(req, res) {
  try {
    const { user } = req;
    const { body } = req;
    await LocationService.createLocation(user, body);
    return res.RH.success();
  } catch (error) {
    console.log(error);
    return res.RH.error(error);
  }
}

export async function getStoreLocationByStoreId(req, res) {
  try {
    const { id } = req.params;
    const query = commonGetQuery(req);
    const stores = await LocationService.getStoreLocationByStoreId(id, query);
    return res.RH.paging(stores, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStoreCategory(req, res) {
  try {
    const storeId = req.params.id;
    const payload = await StoreService.getStoreCategory(storeId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchStoreByLocation(req, res) {
  try {
    const query = commonGetQuery(req);
    const payload = await StoreService.searchStoreByLocation(query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateStoreCategories(req, res) {
  try {
    const { body } = req;
    const storeId = req.user.storeId;
    const payload = await StoreService.updateStoreCategories(body, storeId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getRatingStoreProductById(req, res) {
  try {
    const { type, id } = req.params;
    const query = commonGetQuery(req);
    const payload = await StoreService.getRatingStoreProductById(type, id, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function searchStore(req, res) {
  try {
    const query = commonGetQuery(req);
    const payload = await StoreService.searchStore(query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getStoreLocationByToken(req, res) {
  try {
    const { storeId } = req.user;
    const query = commonGetQuery(req);
    const payload = await StoreService.getStoreLocationByToken(storeId, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function updateStaffInfo(req, res) {
  try {
    const { body } = req;
    const { user } = req;
    const payload = await StoreService.updateStaffInfo(user, body);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

