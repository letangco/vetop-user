import * as ProblemService from './problem.service';
import { commonGetQuery } from '../../../../external/middleware/query';

export async function createProblemSupportByAdmin(req, res) {
    try {
        const { body } = req;
        const payload = await ProblemService.createProblemSupportByAdmin(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListProblemSupportByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await ProblemService.getListProblemSupportByAdmin(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getProblemInfoByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await ProblemService.getProblemInfoByAdmin(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateProblemByAdmin(req, res) {
    try {
        const { body } = req;
        const { id } = req.params;
        const payload = await ProblemService.updateProblemByAdmin(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteProblemByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await ProblemService.deleteProblemByAdmin(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
