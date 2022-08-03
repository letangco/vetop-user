import { error500 } from '../../../../external/util/error';
import SettingGeneral from './settingGeneral.model';

export async function createSettingGeneralDAO(option) {
    try {
        return await SettingGeneral.create(option);
    } catch (error) {
        return error500(error);
    }
}

export async function findSettingGeneralDAO(cond) {
    try {
        return await SettingGeneral.findOne(cond);
    } catch (error) {
        return error500(error);
    }
}

export async function countSettingGeneralDAO(cond) {
    try {
        return await SettingGeneral.countDocuments(cond);
    } catch (error) {
        return error500(error);
    }
}

export async function getSettingGeneralDAO(cond) {
    try {
        return await SettingGeneral.findOne(cond);
    } catch (error) {
        return error500(error);
    }
}
