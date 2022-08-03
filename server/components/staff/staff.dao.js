import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import { toObjectIdFromId } from '../../helpers/help.helper';
import Staff from './staff.model';

export async function findOneStaff(cond) {
    try {
        return await Staff.findOne(cond);
    } catch (error) {
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findStaffByCond(cond, query, sort) {
    try {
        return await Staff.find(cond).sort(sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countStaffByCond(cond) {
    try {
        return Staff.countDocuments(cond);
    } catch (error) {
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findStaffByCondPopulate(statement, cond) {
    try {
        return await Staff.find(statement)
        .populate({
            path: 'userId',
            match: cond
        });
    } catch (error) {
        console.log(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
