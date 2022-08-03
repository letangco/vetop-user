import * as SupportService from './support.service';

export async function createSupportByEmail(req, res) {
    try {
        const { body } = req;
        const payload = await SupportService.createSupportByEmail(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
