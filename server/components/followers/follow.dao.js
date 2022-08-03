import Follow from './followers.model';
import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';

export async function findOneFollowByCond(cond) {
    try {
        return await Follow.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countFollowByCond(cond) {
    try {
        return await Follow.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
