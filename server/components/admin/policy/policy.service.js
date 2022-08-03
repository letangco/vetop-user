/* eslint-disable new-cap */
import { Types } from 'mongoose';
import { ERROR_CODE, TYPE_UPDATE_POLICY } from '../../../../external/constants/constants';
import { error500, errorMessage } from '../../../../external/util/error';
import logger from '../../../api/logger';
import Policy from '../../policy/policy.model';

export async function updatePolicyByType(type, data, auth) {
    try {
        if (!Object.values([TYPE_UPDATE_POLICY.POLICY, TYPE_UPDATE_POLICY.INFO, TYPE_UPDATE_POLICY.INSTRUCTION, TYPE_UPDATE_POLICY.MODEL, TYPE_UPDATE_POLICY.RECOMMENDATION]).includes(type)) {
            return errorMessage(400, ERROR_CODE.TYPE_UPDATE_POLICY_INVALID);
        }
        const countPolicy = await Policy.countDocuments({ type });
        if (data) {
            if (!countPolicy) {
                await Policy.create({
                    adminId: auth._id || '',
                    content: data.content ? data.content : '',
                    title: data.title ? data.title : '',
                    status: data.status,
                    type
                });
            } else {
                const hasPolicy = await Policy.find({ adminId: auth._id, type });
                Object.keys(data)
                    .forEach((key) => {
                        hasPolicy[0][key] = data[key];
                    });
                await hasPolicy[0].save();
                if (hasPolicy[0].adminId !== auth._id) {
                    await hasPolicy[0].updateOne(
                        {
                            $set: { adminId: Types.ObjectId(auth._id) }
                        }
                    );
                }
            }
        }
        return await Policy.find({ type }).select({ adminId: 0 }).lean();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getInfoPolicyByType(type) {
    try {
        if (!Object.values([TYPE_UPDATE_POLICY.POLICY, TYPE_UPDATE_POLICY.INFO, TYPE_UPDATE_POLICY.INSTRUCTION, TYPE_UPDATE_POLICY.MODEL, TYPE_UPDATE_POLICY.RECOMMENDATION]).includes(type)) {
            return errorMessage(400, ERROR_CODE.TYPE_UPDATE_POLICY_INVALID);
        }
        return await Policy.find({ type }).select({ adminId: 0, __v: 0 }).lean();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
