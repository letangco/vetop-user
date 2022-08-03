import logger from '../../api/logger';
import Problem from './problem.model';
import { error500, errorMessage } from '../../../external/util/error';
import { ERROR_CODE } from '../../../external/constants/constants';

export async function getListProblemSupport(options) {
    try {
        const promise = await Promise.all([
            Problem.countDocuments(),
            Problem.find().skip(options.skip).limit(options.limit)
        ]);
        return [promise[0], promise[1]];
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getProblemInfo(id) {
    try {
        const hasProblem = await Problem.findById(id);
        if (!hasProblem) return errorMessage(400, ERROR_CODE.NOT_FOUND_ERR);
        return hasProblem;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
