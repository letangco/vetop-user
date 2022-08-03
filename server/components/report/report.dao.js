import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import Report from './report.model';

export async function createReportDAO(options) {
    try {
        return await Report.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getReport(cond) {
    try {
        return await Report.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getReports(cond, query, sort) {
    try {
        return await Report.find(cond).skip(query.skip).limit(query.limit).sort(sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countReport(cond) {
    try {
        return await Report.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
