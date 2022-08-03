import logger from '../../../api/logger';
import Problem from '../../problem/problem.model';
import { error500, errorMessage } from '../../../../external/util/error';
import { ERROR_CODE } from '../../../../external/constants/constants';

export async function createProblemSupportByAdmin(body) {
    try {
        const hasProblem = await Problem.find({ problem: body.problem });
        if (hasProblem.length) return errorMessage(400, ERROR_CODE.EXISTS);
        await Problem.create(body);
        return Problem.find().lean();
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListProblemSupportByAdmin(options) {
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

export async function getProblemInfoByAdmin(id) {
    try {
        const hasProblem = await Problem.findById(id);
        if (!hasProblem) return errorMessage(400, ERROR_CODE.NOT_FOUND_ERR);
        return hasProblem;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateProblemByAdmin(id, body) {
    try {
        const hasProblem = await Problem.findById(id);
        if (!hasProblem) return errorMessage(400, ERROR_CODE.NOT_FOUND_ERR);
        await hasProblem.updateOne(
            {
                $set: { problem: body.problem }
            }
        );
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteProblemByAdmin(id) {
    try {
        const hasProblem = await Problem.findById(id);
        if (!hasProblem) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await hasProblem.remove();
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
