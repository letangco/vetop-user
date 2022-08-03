import logger from '../../api/logger';
import { error500, errorMessage } from '../../../external/util/error';
import { ERROR_CODE } from '../../../external/constants/constants';
import ProblemModel from '../problem/problem.model';
import SupportModel from './support.model';

export async function createSupportByEmail(body) {
    try {
        body.type = 'support';
        if (body.problemId) {
            const hasProblem = await ProblemModel.findById(body.problemId);
            if (!hasProblem) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
            body.problemId = hasProblem._id;
        }
        await SupportModel.create(body);
        return true;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
