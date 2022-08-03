import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import StoreLocation from './location.model';

export async function findOneStoreLocationByCond(cond) {
    try {
        return await StoreLocation.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function createStoreLocation(options) {
    try {
        return await StoreLocation.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findStoreLocationByCond(cond, query, sort) {
    try {
        return await StoreLocation.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function coundStoreLocationByCond(cond) {
    try {
        return await StoreLocation.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
