import * as LinkService from './link.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function getInfoLink(req, res) {
    try {
        const { id } = req.params;
        const payload = await LinkService.getLinkInfoService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListLink(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await LinkService.getListLinkedService(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
