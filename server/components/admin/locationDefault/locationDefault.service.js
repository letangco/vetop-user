import { remove } from "winston";
import { ERROR_CODE } from "../../../../external/constants/constants";
import { getSort } from "../../../../external/middleware/query";
import { error500, errorMessage } from "../../../../external/util/error";
import { countLocationDefault, createLocationDefault, findLocationDefault, findOneLocationDefault, updateManyLocationDefault } from "./locationDefault.dao";

export async function addLocationDefault(options) {
    try {
        options.loc = {
            type: 'Point',
            coordinates: [options.lng, options.lat]
        };
        return await createLocationDefault(options);
    } catch (error) {
        return error500(error);
    }
}

export async function getLocationDefault(query) {
    try {
        const sort = getSort(query);
        const promise = await Promise.all([countLocationDefault({}), findLocationDefault({}, query, sort)]);
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}

export async function updateLocationDefault(options) {
    try {
        const locationDefault = await findOneLocationDefault({ _id: options._id });
        if (!locationDefault) return errorMessage(404, ERROR_CODE.LOCATION_DEFAULT_NOT_FOUND);
        locationDefault.loc = options?.loc || locationDefault.loc;
        locationDefault.adminId = options?.adminId || locationDefault.adminId;
        locationDefault.address = options?.address || locationDefault.address;
        return await locationDefault.save();
    } catch (error) {
        return error500(error);
    }
}

export async function removeLocationDefault(recordId) {
    try {
        const locationDefault = await findOneLocationDefault({ _id: recordId });
        if (!locationDefault) return errorMessage(404, ERROR_CODE.LOCATION_DEFAULT_NOT_FOUND);
        await locationDefault.remove();
        return true;
    } catch (error) {
        return error500(error)
    }
}

export async function getLocationDefaultById(recordId) {
    try {
        const locationDefault = await findOneLocationDefault({ _id: recordId });
        if (!locationDefault) return errorMessage(404, ERROR_CODE.LOCATION_DEFAULT_NOT_FOUND);
        return locationDefault;
    } catch (error) {
        return error500(error);
    }
}

export async function changeStatusLocationDefault(recordId) {
    try {
        const locationDefault = await findOneLocationDefault({ _id: recordId });
        if (!locationDefault) return errorMessage(404, ERROR_CODE.LOCATION_DEFAULT_NOT_FOUND);
        await updateManyLocationDefault({}, { $set: { status: false }});
        locationDefault.status = true;
        return await locationDefault.save();
    } catch (error) {
        return error500(error);
    }
}
