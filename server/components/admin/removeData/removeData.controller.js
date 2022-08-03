import * as RemoveDataService from './removeData.service';

export async function removeData(req, res) {
    try {
        const { list } = req.body;
        await RemoveDataService.removeAllData(list);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}
