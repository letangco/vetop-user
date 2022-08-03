import { commonGetQuery } from '../../../../external/middleware/query';
import * as UserService from './user.service';

export async function searchUser(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await UserService.searchUser(query);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changePassword(req, res) {
    try {
        const auth = req.user;
        const { body } = req;
        const payload = await UserService.changePassword(auth, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changeProfile(req, res) {
    try {
        const auth = req.user;
        const { body } = req;
        const payload = await UserService.changeProfile(auth, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function verifyAccount(req, res) {
    try {
        const { body } = req;
        await UserService.verifyAccount(body);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changePhoneNumberByAdmin(req, res) {
    try {
        const { body } = req;
        const payload = await UserService.changePhoneNumberByAdmin(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListPhoneNumberHistory(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await UserService.getListPhoneNumberHistory(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoChangePhoneNumberHistory(req, res) {
    try {
        const { id } = req.params;
        const payload = await UserService.getInfoChangePhoneNumberHistory(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
