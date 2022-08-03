import { ERROR_CODE, TYPE_ACCOUNT_BANK } from '../../../external/constants/constants';
import { getSort } from '../../../external/middleware/query';
import { error500, errorMessage } from '../../../external/util/error';
import { findOneStateByCond } from '../state/state.dao';
import { getStoreById } from '../store/store.dao';
import { getUserById } from '../user/user.dao';
import {
 createBankInfo, findOneBankInfo, findBankInfoByCond, countBankInfoByCond
} from './bankInfo.dao';
import { findBankListUnlimt, findOneBankList } from './bankList.dao';

export async function addBankInfoStore(options) {
    try {
        const store = await getStoreById(options.storeId);
        if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const bank = await findOneBankList({ _id: options.bankId });
        if (!bank) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        const newBankInfo = await createBankInfo(options);
        return newBankInfo;
    } catch (error) {
        return error500(error);
    }
}

export async function addBankInfoUser(options) {
    try {
        const user = await getUserById(options.userId);
        if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const bank = await findOneBankList({ _id: options.bankId });
        if (!bank) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        const newBankInfo = await createBankInfo(options);
        return newBankInfo;
    } catch (error) {
        return error500(error);
    }
}

export async function changeStatusBankAccount(options) {
    try {
        const promise = await Promise.all([findOneBankInfo({ storeId: options.storeId, status: true }), findOneBankInfo({ _id: options.bankInfoId })]);
        if (!promise[1]) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        if (!promise[0]) {
            promise[1].status = true;
            return await promise[1].save();
        }
        promise[0].status = false;
        promise[1].status = true;
        await Promise.all([promise[0].save(), promise[1].save()]);
        return promise[1];
    } catch (error) {
        return error500(error);
    }
}

export async function changeStatusBankAccountUser(options) {
    try {
        const promise = await Promise.all([findOneBankInfo({ userId: options.userId, status: true }), findOneBankInfo({ _id: options.bankInfoId })]);
        if (!promise[1]) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        if (!promise[0]) {
            promise[1].status = true;
            return await promise[1].save();
        }
        promise[0].status = false;
        await Promise.all([promise[0].save(), promise[1].save()]);
        return promise[1];
    } catch (error) {
        return error500(error);
    }
}

export async function updateBankInfo(options) {
    try {
        const bankInfo = await findOneBankInfo({ _id: options.bankInfoId });
        if (!bankInfo) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        bankInfo.bankName = options?.bankName || bankInfo.bankName;
        bankInfo.bankId = options?.bankId || bankInfo.bankId;
        bankInfo.ownerName = options?.ownerName || bankInfo.ownerName;
        bankInfo.bankBranch = options?.bankBranch || bankInfo.bankBranch;
        bankInfo.accountNumber = options?.accountNumber || bankInfo.accountNumber;
        return await bankInfo.save();
    } catch (error) {
        return error500(error);
    }
}

export async function removeBankInfo(id) {
    try {
        const bankInfo = await findOneBankInfo({ _id: id });
        if (!bankInfo) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        await bankInfo.remove();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function getBankInfo(storeId, query) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([countBankInfoByCond({ storeId }), findBankInfoByCond({ storeId }, query, sort)]);
        return [promise[0], await getMetaDataBankInfo(promise[1])];
    } catch (error) {
        return error500(error);
    }
}

export async function getBankInfoUser(userId, query) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([countBankInfoByCond({ userId }), findBankInfoByCond({ userId }, query, sort)]);
        return [promise[0], await getMetaDataBankInfo(promise[1])];
    } catch (error) {
        return error500(error);
    }
}

export async function getMetaDataBankInfo(data) {
    try {
        const isArray = Array.isArray(data);
        if (!isArray) {
            data = [data];
        }
        const promise = data.map(async (item) => {
            item = item.toObject();
            if (item?.bankId) {
                const bank = await findOneBankList({ _id: item.bankId });
                item.bankId = bank || {};
            }
            return item;
        });
        const result = await Promise.all(promise);
        return isArray ? result : result[0];
    } catch (error) {
        return error500(error);
    }
}

export async function getBankList(query) {
    try {
        const sort = getSort(query);
        const bankList = await findBankListUnlimt({ }, sort);
        return bankList;
    } catch (error) {
        return error500(error);
    }
}
