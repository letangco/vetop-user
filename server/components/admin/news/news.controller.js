import * as NewsService from './news.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function getInfoNews(req, res) {
    try {
        const { id } = req.params;
        const payload = await NewsService.getInfoNews(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListNews(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await NewsService.getListNews(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSpecialNews(req, res) {
    try {
        const payload = await NewsService.getSpecialNews();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function filterRelatedNews(req, res) {
    try {
        const { id } = req.params;
        const query = commonGetQuery(req);
        const payload = await NewsService.filterRelatedNews(id, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}