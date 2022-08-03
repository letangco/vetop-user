import { commonGetQuery } from '../../../../external/middleware/query';
import * as LocationDefaultService from './locationDefault.service';

export async function addLocationDefault(req, res) {
    try {
        const options = {
            adminId: req?.user?._id,
            ...req.body
        };
        const payload = await LocationDefaultService.addLocationDefault(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getLocationDefault(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await LocationDefaultService.getLocationDefault(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateLocationDefault(req, res) {
    try {
        const options = {
            adminId: req?.user?._id,
            ...req.body
        };
        const payload = await LocationDefaultService.updateLocationDefault(options);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function removeLocationDefault(req, res) {
    try {
        const recordId = req.params.id;
        await LocationDefaultService.removeLocationDefault(recordId);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getLocationDefaultById(req, res) {
    try {
        const recordId = req.params.id;
        const payload = await LocationDefaultService.getLocationDefaultById(recordId);
        return res.RH.success(payload);
    } catch (error) {
       return res.RH.error(error); 
    }
}

export async function changeStatusLocationDefault(req, res) {
    try {
        const { _id } = req.body;
        const payload = await LocationDefaultService.changeStatusLocationDefault(_id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
