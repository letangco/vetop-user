import { ERROR_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import SearchCode from './codeSearch.model';

export async function createCodeSearch(options) {
    try {
        return await SearchCode.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneCodeSearchByCondDAO(cond) {
    try {
        return await SearchCode.findOne(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getCodeSearch(cond, query) {
    try {
        return await SearchCode.find(cond).skip(query.skip).limit(query.limit).sort(query.sort);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countCodeSearch(cond) {
    try {
        return await SearchCode.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteListCodeSearch() {
    try {
        return await SearchCode.remove();
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
