import * as PolicyService from './policy.service';

export async function getInfoPolicyByUser(req, res) {
    try {
        const { type } = req.params;
        return res.RH.success(await PolicyService.getInfoPolicyByUser(type));
    } catch (error) {
        return res.RH.error(error);
    }
}
