import { ERROR_CODE } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import changePhoneNumberHistory from './changePhoneHistory.model';

export async function addHistoryPhoneNumber(data) {
    try {
        return await changePhoneNumberHistory.create(data);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListPhoneNumberHistoryDAO(cond) {
    try {
        return await changePhoneNumberHistory.find().limit(cond.limit).skip(cond.skip).sort({ createdAt: -1 });
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countHistoryPhoneNumberChangeByCond(cond) {
    try {
        return await changePhoneNumberHistory.countDocuments(cond);
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneHistoryChangePhoneNumberByCond(cond) {
    try {
        return await changePhoneNumberHistory.findOne(cond).select({ __v: 0 });
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
