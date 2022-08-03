import { CHAT_REPORT_TYPE, ERROR_CODE, TYPE_LOGIN } from "../../../external/constants/constants";
import { error500, errorMessage } from "../../../external/util/error";
import { getStoreById } from "../store/store.dao";
import { getUserById } from "../user/user.dao";
import { createBlockUser } from '../../../internal/grpc/notification/request';
import { createReportDAO } from './report.dao';

export async function createReport(options) {
    try {
        let user = {};
        let type = TYPE_LOGIN.USER;
        if (options.userId) {
            user = await getUserById(options.userId);
        } else {
            type = TYPE_LOGIN.STORE;
            user = await getStoreById(options.storeId);
        }
        if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        if (!Object.values(CHAT_REPORT_TYPE).includes(Number(options.type))) return errorMessage(400, ERROR_CODE.TYPE_REPORT_INVAILID);
        if (options?.isBlock) {
            await createBlockUser(options.reporter, type, user._id);
        }
        const data = await createReportDAO(options);
        return data;
    } catch (error) {
        return error500(error);
    }
}