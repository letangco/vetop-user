import * as adminService from './admin.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function loginAdmin(req, res) {
    try {
        const body = req.body;
        const payload = await adminService.loginService(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
// User
export async function getUsers(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.getUsers(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

// 2. Get detail info user
export async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.getUserByIdService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getReferUsers(req, res) {
    try {
        const query = commonGetQuery(req);
        return res.RH.paging(await adminService.getReferUsers(query), query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getFilterUsers(req, res) {
    try {
        const query = commonGetQuery(req);
        return res.RH.paging(await adminService.getFilterUsers(query), query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}
// Store
export async function getFilterStores(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.getFilterStores(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getStoreByIdAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.getStoreByIdAdmin(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getStaffsStore(req, res) {
    try {
        const { id } = req.params;
        const query = commonGetQuery(req);
        const payload = await adminService.getStaffsStore(id, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function selectTypeCode(req, res) {
    try {
        const type = Number(req.query.type);
        const payload = await adminService.selectTypeCode(type);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

// Slide show
export async function createSlideShow(req, res) {
    try {
        const data = req.body;
        const payload = await adminService.createSlideShow(data);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateSlideShow(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const payload = await adminService.updateSlideShowService(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteSlideShow(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.deleteSlideShow(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoSlideShow(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.getInfoSlideShow(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSlideShows(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.getSlideShows(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function sortSlideByAdmin(req, res) {
    try {
        const { body } = req;
        const payload = await adminService.sortSlideByAdmin(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

// News
export async function createNewsByAdmin(req, res) {
    try {
        const { body } = req;
        const auth = req.user;
        const payload = await adminService.createNewsByAdmin(body, auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteNewsByAdmin(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.deleteNewsByAdmin(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateNewsByAdmin(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const auth = req.user;
        const payload = await adminService.updateNewsByAdmin(id, body, auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function chooseSpecialNews(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.chooseSpecialNews(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListNews(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.getListNews(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoNews(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.getInfoNews(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSpecialNews(req, res) {
    try {
        const payload = await adminService.getSpecialNews();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfo(req, res) {
    try {
        const auth = req.user;
        const payload = await adminService.getInfoUserService(auth);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusUserById(req, res) {
    try {
        const { id, status } = req.params;
        const payload = await adminService.updateStatusUserByIdService(id, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateStatusStoreById(req, res) {
    try {
        const { id, status } = req.params;
        const payload = await adminService.updateStatusStoreById(id, status);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function createListLinked(req, res) {
    try {
        const { body } = req;
        const payload = await adminService.createListLinked(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteLinkById(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.deleteLinkByIdService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateLinkedById(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const payload = await adminService.updateLinkedById(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function sortListLinkedById(req, res) {
    try {
        const { body } = req;
        const payload = await adminService.sortListLinkedByIdService(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getLinkInfoById(req, res) {
    try {
        const { id } = req.params;
        const payload = await adminService.getLinkInfoService(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getListLinked(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.getListLinkedService(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function exportUserXlsByAdmin(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await adminService.exportUserXlsByAdminService(query);
        res.setHeader('Content-Disposition', `attachment; filename=${payload[0]}`);
        return res.send(payload[1]);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateAvatarAdmin(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await adminService.updateAvatarAdminService(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
