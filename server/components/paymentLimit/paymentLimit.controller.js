import * as PaymentLimitService from './paymentLimit.service';

export async function addPaymentLimit(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await PaymentLimitService.addPaymentLimit(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);        
    }
}

