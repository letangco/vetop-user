import logger from '../../api/logger';
import Location from './location.model';
import { error500, errorMessage } from '../../../external/util/error';
import {
ERROR_CODE
} from '../../../external/constants/constants';
import { countStaffByCond, findStaffByCond } from '../staff/staff.dao';
import { countStoreLocationDAO, getStoreById } from './store.dao';
import { findOneStoreLocationByCond, findStoreLocationByCond, coundStoreLocationByCond } from './location.dao';
import { findOneCountryByCond } from '../country/country.dao';
import { findOneStateByCond } from '../state/state.dao';
import { getSort } from '../../../external/middleware/query';
import districtModel from '../state/district.model';

/**
 * Create Location For Store
 * @param {Object} auth
 * @param {Object} information
 * @returns {Promise.<*>} The Location model after create location information success or an error
 */
export async function createLocation(auth, options) {
  try {
    const store = await getStoreById(auth.storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const district = await districtModel.findById(options.districtId);
    if (!district) return errorMessage(404, ERROR_CODE.DISTRICT_INVALID);
    const country = await findOneCountryByCond({ _id: options.countryId });
    if (!country) return errorMessage(404, ERROR_CODE.COUNTRY_INVALID);
    const state = await findOneStateByCond({ _id: options.stateId });
    if (!state) return errorMessage(404, ERROR_CODE.STATE_NOT_FOUND);
    // create location
    const location = new Location({
      storeId: auth.storeId,
      stateId: options.stateId,
      countryId: options.countryId,
      districtId: options.districtId,
      loc: {
        type: 'Point',
        coordinates: [options.lng, options.lat]
      },
      address: options.address,
      name: options.name,
      phone: options.phone
    });
    if (options?.isDefault) {
      const storeLocation = await findOneStoreLocationByCond({ storeId: auth.storeId, status: true });
      store.address = location.address;
      store.loc = location.loc;
      store.countryId = location.countryId;
      store.stateId = location.stateId;
      store.districtId = location.districtId;
      store.name = location.name;
      store.phone = location.phone;
      location.status = true;
      if (storeLocation?._id) {
        storeLocation.status = false;
        await storeLocation.save();
      }
      await Promise.all([location.save(), store.save()]);
    }
    await location.save();
    return location;
  } catch (error) {
    console.log(error);
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getStoreLocationByStoreId(id, query) {
  try {
    const store = await getStoreById(id);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const sort = getSort(query);
    const promise = await Promise.all([coundStoreLocationByCond({ storeId: store }), findStoreLocationByCond({ storeId: id }, query, sort)]);
    if (promise[1].length) {
      promise[1] = await getMetaDataStoreLocation(promise[1]);
    }
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}

/**
 * Get Location Information
 * @param {string} locationId
*/
export async function getLocation(id) {
  try {
    const result = await Location.findById(id);
    if (result?._id) {
      return await getMetaDataStoreLocation(result);
    }
    return errorMessage(404, ERROR_CODE.STORE_LOCATION_NOT_FOUND);
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * delete Location
 * @param {String} LocationId
*/
export async function deleteLocation(id) {
  try {
    const location = await Location.findById(id).lean();
    if (!location) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    return await location.remove();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * get Locations
 * @param {Object} options
 */
export async function getLocations(options) {
  try {
    const result = await Promise.all([
      Location.countDocuments(),
      Location.find({}).sort({ _id: -1 }).limit(options.limit).skip(options.skip)
    ]);
    return [result[0], await getMetaDataStoreLocation(result[1])];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updateStoreLocationDefault(storeId, storeLocationId) {
  try {
    const store = await getStoreById(storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const promise = await Promise.all([findOneStoreLocationByCond({ _id: storeLocationId }), findOneStoreLocationByCond({ storeId, status: true })]);
    if (!promise[0]) return errorMessage(404, ERROR_CODE.STORE_LOCATION_NOT_FOUND);
    store.address = promise[0].address;
    store.loc = promise[0].loc;
    store.countryId = promise[0].countryId;
    store.stateId = promise[0].stateId;
    store.districtId = promise[0].districtId;
    store.name = promise[0].name;
    store.phone = promise[0].phone;
    if (promise[1]?._id) {
      promise[1].status = false;
    }
    promise[0].status = true;
    await Promise.all(store.save(), promise[0].save(), promise[1].save());
    return true;
  } catch (error) {
    return error500(error);
  }
}

export async function getMetaDataStoreLocation(data) {
  try {
    const isArray = Array.isArray(data);
    if (!isArray) {
      data = [data];
    }
    if (data.length) {
      const promise = data.map(async (item) => {
        item = item.toObject();
        if (item?.stateId) {
          const state = await findOneStateByCond({ _id: item.stateId });
          item.stateId = state || {};
        }
        if (item?.districtId) {
          const district = await districtModel.findById(item.districtId);
          item.districtId = district || {};
        }
        return item;
      });
      const result = await Promise.all(promise);
      return isArray ? result : result[0];
    }
    return isArray ? [] : {};
  } catch (error) {
    return error500(error);
  }
}

export async function updateStoreLocation(body) {
  try {
    const store = await getStoreById(body.storeId);
    if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const storeLocation = await findOneStoreLocationByCond({ _id: body.id });
    if (!storeLocation) return errorMessage(404, ERROR_CODE.STORE_LOCATION_NOT_FOUND);
    if (body?.countryId) {
      const country = await findOneCountryByCond({ _id: body.countryId });
      if (!country) return errorMessage(404, ERROR_CODE.COUNTRY_NOT_FOUND);
    }
    if (body?.stateId) {
      const state = await findOneStateByCond({ _id: body.stateId });
      if (!state) return errorMessage(404, ERROR_CODE.STATE_NOT_FOUND);
    }
    if (body?.districtId) {
      const district = await districtModel.findById({ _id: body.districtId });
      if (!district) return errorMessage(404, ERROR_CODE.DISTRICT_INVALID);
    }
    storeLocation.address = body?.address || storeLocation.address;
    storeLocation.loc = body?.loc || storeLocation.loc;
    storeLocation.countryId = body?.countryId || storeLocation.countryId;
    storeLocation.stateId = body?.stateId || storeLocation.stateId;
    storeLocation.districtId = body?.districtId || storeLocation.districtId;
    storeLocation.name = body?.name || storeLocation.name;
    storeLocation.phone = body?.phone || storeLocation.phone;
    if (body?.isDefault) {
      const preStoreLocation = await findOneStoreLocationByCond({ storeId: body.storeId, status: true, _id: { $ne: body.id } });
      store.address = storeLocation.address;
      store.loc = storeLocation.loc;
      store.countryId = storeLocation.countryId;
      store.stateId = storeLocation.stateId;
      store.districtId = storeLocation.districtId;
      store.name = storeLocation.name;
      store.phone = storeLocation.phone;
      if (preStoreLocation?._id) {
        preStoreLocation.status = false;
        await preStoreLocation.save();
      }
      await store.save();
      storeLocation.status = true;
    }
    await storeLocation.save();
    return storeLocation;
  } catch (error) {
    return error500(error);
  }
}

export async function removeStoreLocation(id) {
  try {
    const storeLocation = await findOneStoreLocationByCond({ _id: id });
    if (!storeLocation) return errorMessage(404, ERROR_CODE.STORE_LOCATION_NOT_FOUND);
    return await storeLocation.remove();
  } catch (error) {
    return error500(error);
  }
}
