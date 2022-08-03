import logger from '../../api/logger';
import Policy from './policy.model';
import { error500, errorMessage } from '../../../external/util/error';
import { ERROR_CODE, TYPE_UPDATE_POLICY } from '../../../external/constants/constants';

export async function getInfoPolicyByUser(type) {
    try {
        if (!Object.values([TYPE_UPDATE_POLICY.POLICY, TYPE_UPDATE_POLICY.INFO, TYPE_UPDATE_POLICY.INSTRUCTION, TYPE_UPDATE_POLICY.MODEL, TYPE_UPDATE_POLICY.RECOMMENDATION]).includes(type)) {
            return errorMessage(400, ERROR_CODE.TYPE_UPDATE_POLICY_INVALID);
        }
        return await Policy.find({ type }).select({ adminId: 0, __v: 0, status: 0 }).lean();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
