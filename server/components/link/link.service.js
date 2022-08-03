import { ERROR_CODE } from '../../../external/constants/constants';
import LinkModel from './link.model';
import logger from '../../api/logger';
import { error500, errorMessage } from '../../../external/util/error';
import { getSort } from '../../../external/middleware/query';

export async function getLinkInfoService(id) {
    try {
        const hasLinked = await LinkModel.findById(id);
        if (!hasLinked || !hasLinked.link || hasLinked.link === '') return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        return await hasLinked.metaDataLink();
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListLinkedService(options) {
    try {
        const conditions = {};
        if (options.keyword) {
            conditions.$or = [
                {
                    title: { $regex: options.keyword, $options: 'i' }
                }
            ];
        }
        let sort;
        if (!options.sort) {
            sort = { index: 'asc' };
        } else {
            sort = getSort(options);
        }
        conditions.link = { $exists: true, $ne: '' };
        const payload = await Promise.all([
            LinkModel.find(conditions).countDocuments(),
            LinkModel.find(conditions)
            .skip(options.skip)
            .limit(options.limit)
            .sort(sort)
        ]);
        const response = await Promise.all(payload[1].map(item => item.metaDataLink()));
        return [payload[0], response];
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
