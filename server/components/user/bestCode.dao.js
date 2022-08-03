import { ERROR_CODE } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import BestCode from './bestCode.model';

export async function createManyBestCode(options) {
    try {
        return await BestCode.insertMany(options);
    } catch (error) {
        console.log(error);
        return errorMessage(500, error);
    }
}

export async function countBestCodeByCond(cond) {
    try {
        return await BestCode.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneBestCodeByCond(cond) {
    try {
        return await BestCode.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findBestCodeByCond(cond, query) {
    try {
        return await BestCode.find(cond).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error);
    }
}

export async function findBestCodeByCondNoQuery(cond) {
    try {
        return await BestCode.find(cond);
    } catch (error) {
        console.log(error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
