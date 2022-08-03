import * as slideShowService from './slideManagement.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function getInfoSlideShow(req, res) {
    try {
        const { id } = req.params;
        const payload = await slideShowService.getInfoSlideShow(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSlideShows(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await slideShowService.getSlideShows(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
