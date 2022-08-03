import { ERROR_CODE } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import logger from '../../api/logger';
import APIError from '../../util/APIError';
import Admin from './admin.model';

export async function createAdminDAO(options) {
    try {
        return await Admin.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneAdminByCondDAO(cond) {
    try {
        return await Admin.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getAdminById(id) {
    try {
      const admin = await Admin.findById(id);
      return admin;
    } catch (err) {
      logger.error('Error getAdminById: ', err);
      return Promise.reject(new APIError(err.statusCode || 500, err.message || err.errors || 'Database Busy'));
    }
  }
