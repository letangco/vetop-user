import * as ProblemService from './problem.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function getListProblemSupport(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await ProblemService.getListProblemSupport(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getProblemInfo(req, res) {
    try {
        const { id } = req.params;
        const payload = await ProblemService.getProblemInfo(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
