import SlideShow from './slideManagement.model';
import { ERROR_CODE } from '../../../../external/constants/constants';
import { error500, errorMessage } from '../../../../external/util/error';
import logger from '../../../api/logger';

export async function getInfoSlideShow(id) {
    try {
        const hasSlide = await SlideShow.findById(id);
        if (!hasSlide) return errorMessage(404, ERROR_CODE.SLIDE_SHOW_NOT_FOUND);
        return hasSlide.metaData();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSlideShows(options) {
    try {
        const listSlide = await SlideShow.find();
        if (!listSlide[0]) return listSlide;
        const payload = await Promise.all([
            SlideShow.countDocuments(),
            SlideShow.find()
                .skip(options.skip)
                .limit(options.limit)
                .sort({ index: 1 })
        ]);
        const result = await Promise.all(payload[1].map(item => item.metaData()));
        return [payload[0], result];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
