import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import State from './state.model';

export async function findOneStateByCond(cond) {
    try {
        return await State.findOne(cond)
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR)
    }
}

export async function getStateById(id) {
    try {
        return await State.findById(id);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
