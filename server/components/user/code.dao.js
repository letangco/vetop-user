import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import Code from './code.model';

export async function createCodeDAO(options) {
    try {
        return Code.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCodeByCond(cond) {
    try {
        return Code.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findCodeByCondDAO(cond) {
    try {
        return Code.find(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
