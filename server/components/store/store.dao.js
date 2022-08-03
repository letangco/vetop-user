import Store from './store.model';
import logger from '../../api/logger';
import APIError from '../../util/APIError';
import { error500 } from '../../../external/util/error';
import { ERROR_CODE } from '../../../external/constants/constants';

export async function getStoreById(id) {
  try {
    const store = await Store.findById(id);
    return store;
  } catch (err) {
    logger.error('Error getStoreById: ', err);
    return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
  }
}

export async function getStoreByUser(userId) {
  try {
    const store = await Store.findOne({ userId });
    return store;
  } catch (err) {
    logger.error('Error getStoreByUser: ', err);
    return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
  }
}

export async function findStoreByCond(cond, query, sort) {
  try {
    return await Store.find(cond).sort(sort).skip(query.skip).limit(query.limit);
  } catch (error) {
    return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function countStoreByCond(cond) {
  try {
    return await Store.countDocuments(cond);
  } catch (error) {
    return error500(error);
  }
}

export async function findStoreLocationNoneMaxDistanceDAO(cond, loc, query, sort) {
  try {
    const data = await Store.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        key: 'loc',
        // eslint-disable-next-line no-cond-assign
        distanceField: 'distance',
        query: cond,
        spherical: true
      }
    },
    { $sort: sort || { createdAt: -1 } },
    { $skip: query?.skip || 0 },
    { $limit: query?.limit || 1 }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return error500(error);
  }
}

export async function findStoreLocationDAO(cond, match, loc, query, sort, maxDistance) {
  try {
    let key = {};
    if (match.match) {
      key = match.match;
    }
    const data = await Store.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        key: 'loc',
        maxDistance,
        // eslint-disable-next-line no-cond-assign
        distanceField: 'distance',
        query: cond,
        spherical: true
      }
    },
    { $match: key },
    { $sort: sort || { createdAt: -1 } },
    { $skip: query?.skip || 0 },
    { $limit: query?.limit || 1 }
    ]);
    return data;
  } catch (error) {
    console.log(error);
    return error500(error);
  }
}

export async function findStoreLocationUnlimitDAO(cond, match, loc, query, sort, maxDistance) {
  try {
    let key = {};
    if (match.match) {
      key = match.match;
    }
    const data = await Store.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        key: 'loc',
        maxDistance,
        // eslint-disable-next-line no-cond-assign
        distanceField: 'distance',
        query: cond,
        spherical: true
      }
    },
    { $match: key },
    { $sort: sort || { createdAt: -1 } } ]);
    return data;
  } catch (error) {
    console.log(error);
    return error500(error);
  }
}

export async function countStoreLocationDAO(cond, match, loc, maxDistance) {
  try {
    let key = {};
    if (match.match) {
      key = match.match;
    }
    const data = await Store.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        key: 'loc',
        maxDistance,
        // eslint-disable-next-line no-cond-assign
        distanceField: 'distance',
        query: cond,
        spherical: true
      }
    },
    { $match: key }
    ]);
    return data;
  } catch (error) {
    return error500(error);
  }
}

export async function getStoreByCond(cond) {
  try {
    return await Store.findOne(cond);
  } catch (error) {
    return error500(error);
  }
}
