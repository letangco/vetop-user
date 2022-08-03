import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import BankInfo from './bankInfo.model';

export async function createBankInfo(options) {
    try {
        return await BankInfo.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneBankInfo(cond) {
    try {
        return await BankInfo.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findBankInfoByCond(cond, query, sort) {
    try {
        return await BankInfo.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countBankInfoByCond(cond) {
    try {
        return await BankInfo.count(cond)
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
