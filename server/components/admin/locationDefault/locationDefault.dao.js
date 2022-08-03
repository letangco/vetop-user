import { ERROR_CODE } from '../../../../external/constants/constants';
import { error500 } from '../../../../external/util/error';
import LocationDefault from './locationDefault.model';

export async function createLocationDefault(options) {
    try {
        return await LocationDefault.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function findLocationDefault(cond, query, sort) {
    try {
        return await LocationDefault.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function findOneLocationDefault(cond) {
    try {
        return await LocationDefault.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function countLocationDefault(cond) {
    try {
        return await LocationDefault.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function updateManyLocationDefault(cond, to) {
    try {
        return await LocationDefault.updateMany(cond, to);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
