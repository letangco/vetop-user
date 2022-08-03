import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import BankList from './bankList.model';

export async function createBankList(options) {
    try {
        return await BankList.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneBankList(cond) {
    try {
        return await BankList.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findBankList(cond, query, sort) {
    try {
        return await BankList.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findBankListUnlimt(cond, sort) {
    try {
        return await BankList.find(cond).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countBankListByCond(cond) {
    try {
        return await BankList.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}
