import { ERROR_CODE } from "../../../external/constants/constants";
import { error500, errorMessage } from "../../../external/util/error";
import staffModel from "../staff/staff.model";

export async function addPaymentLimit(user, body) {
    try {
        const staff = await staffModel.findById(body.staffId);
        if (!staff) return errorMessage(404, ERROR_CODE.STAFF_NOT_FOUND);
        staff.paymentLimit = body.value;
        await staff.save();
        return staff;
    } catch (error) {
        return error500(error);
    }
}
