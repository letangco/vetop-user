import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import CodeVip from './codeVip.model';

export async function findCodeVipByCondDAO(cond) {
    try {
        return await CodeVip.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function createManyCodeVipDAO(options) {
    try {
        return await CodeVip.insertMany(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCodeVipByCondDAO(cond) {
    try {
        return await CodeVip.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countCodeVipByCond() {
    try {
        return await CodeVip.countDocuments();
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteManyCodeVip() {
    try {
        return await CodeVip.deleteMany();
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}