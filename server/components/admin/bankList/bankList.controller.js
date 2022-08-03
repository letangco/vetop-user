import { commonGetQuery } from '../../../../external/middleware/query';
import * as BankListServiceAdmin from './bankList.service';

export async function addBankList(req, res) {
    try {
        const options = {
            ...req.body
        };
        console.log(options)
        const payload = await BankListServiceAdmin.addBankList(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function removeBankList(req, res) {
    try {
        const { id } = req.params;
        await BankListServiceAdmin.removeBankList(id);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateBankList(req, res) {
    try {
        const options = {
            ...req.body
        };
        const payload = await BankListServiceAdmin.updateBankList(options);
        return payload;
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getBankList(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await BankListServiceAdmin.getBankList(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
