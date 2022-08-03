import { ERROR_CODE } from "../../../../external/constants/constants";
import { getSort } from "../../../../external/middleware/query";
import { error500, errorMessage } from "../../../../external/util/error";
import { countBankListByCond, createBankList, findBankList, findOneBankList } from "../../bankInfo/bankList.dao";

export async function addBankList(options) {
    try {
        const newBankInfo = await createBankList(options);
        return newBankInfo;
    } catch (error) {
        return error500(error);
    }
}

export async function getBankList(query) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([countBankListByCond({}), findBankList({}, query, sort)]);
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}

export async function removeBankList(id) {
    try {
        const bank = await findOneBankList({ _id: id });
        if (!bank) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        await bank.remove();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function updateBankList(options) {
    try {
        const bank = await findOneBankList({ _id: options.bankListId });
        if (!bank) return errorMessage(404, ERROR_CODE.BANK_INFO_NOT_FOUND);
        bank.name = options?.name || bank.name;
        bank.image = options?.image || bank.image;
        bank.code = options?.code || bank.code;
        return await bank.save();
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
