import User from './user.model';
import APIError from '../../util/APIError';
import logger from '../../api/logger';
import { error500 } from '../../../external/util/error';
import { getStoreById } from '../store/store.dao';

export async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    logger.error('Error userFindByID: ', err);
    return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
  }
}

export async function findUserByCond(cond) {
  try {
    return await User.find(cond);
  } catch (error) {
    return error500(error);
  }
}

export async function getAllInfoUser() {
  try {
    return await User.find();
  } catch (error) {
    return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
  }
}

export async function getListUser(users) {
  try {
    return await User.find({
      _id: {
        $in: users
      }
    }, '_id fullName avatar status');
  } catch (error) {
    return error500(error);
  }
}

export async function getListUserInfoByArrayDAO(users) {
  try {
    return await User.find({
      _id: {
        $in: users
      }
    });
  } catch (error) {
    return error500(error);
  }
}

export async function findOneUserByCondDAO(cond) {
  try {
    return User.findOne(cond).select({ password: 0 });
  } catch (error) {
    return error500(error);
  }
}

export async function getUserByStore(storeId) {
  try {
    const store = await getStoreById(storeId);
    const user = await getUserById(store.userId);
    return user;
  } catch (error) {
    logger.error(error);
    return error500(error);
  }
}

export async function getUserDAO(cond) {
  try {
    return await User.findOne(cond);
  } catch (error) {
    return error500(error);
  }
}

export async function getUserByIdAndCondition(id, cond) {
  try {
    const user = await User.findById(id).select(cond);
    return user;
  } catch (err) {
    logger.error('Error userFindByID: ', err);
    return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
  }
}