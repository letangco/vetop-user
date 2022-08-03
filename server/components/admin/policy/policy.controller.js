import * as adminPolicyService from './policy.service';

export async function updatePolicyByType(req, res) {
    try {
        const { type } = req.params;
        const { body } = req;
        const auth = req.user;
        const payload = await adminPolicyService.updatePolicyByType(type, body, auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoPolicyByAdmin(req, res) {
    try {
        const { type } = req.params;
        return res.RH.success(await adminPolicyService.getInfoPolicyByType(type));
    } catch (error) {
        return res.RH.error(error);
    }
}
