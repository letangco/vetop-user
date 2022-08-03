import { commonGetQuery } from '../../../external/middleware/query';
import { error500 } from '../../../external/util/error';
import * as BankInfoService from './bankInfo.service';

export async function addBankInfo(req, res) {
    try {
        const options = {
            storeId: req.user.storeId,
            ...req.body
        };
        const payload = await BankInfoService.addBankInfoStore(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changeBankInfoDefaut(req, res) {
    try {
        const options = {
            storeId: req.user.storeId,
            bankInfoId: req.body.bankInfoId
        };
        const payload = await BankInfoService.changeStatusBankAccount(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function addBankInfoUser(req, res) {
    try {
        const options = {
            userId: req.user._id,
            ...req.body
        };
        const payload = await BankInfoService.addBankInfoUser(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getBankInfoUser(req, res) {
    try {
        const query = commonGetQuery(req);
        const userId = req.user._id;
        const payload = await BankInfoService.getBankInfoUser(userId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changeBankInfoDefaultUser(req, res) {
    try {
        const options = {
            userId: req.user._id,
            bankInfoId: req.body.bankInfoId
        };
        const payload = await BankInfoService.changeStatusBankAccountUser(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateBankInfo(req, res) {
    try {
        const options = {
            ...req.body
        };
        const payload = await BankInfoService.updateBankInfo(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function removeBankInfo(req, res) {
    try {
        const { id } = req.params;
        const payload = await BankInfoService.removeBankInfo(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getBankInfos(req, res) {
    try {
        const query = commonGetQuery(req);
        const { storeId } = req.user;
        const payload = await BankInfoService.getBankInfo(storeId, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getBankList(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await BankInfoService.getBankList(query);
        return res.RH.success(payload);
    } catch (error) {
        return error500(error);
    }
}