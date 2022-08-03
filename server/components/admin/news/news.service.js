import { isArray } from 'lodash';
import logger from '../../../api/logger';
import News from './news.model';
import { error500, errorMessage } from '../../../../external/util/error';
import { ERROR_CODE, SHARE_HOST } from '../../../../external/constants/constants';
import { getCategoriesInfo } from '../../../../internal/grpc/store/request';
import { GetFileData } from '../../../../external/util/file';
import { DEFAULT_AVATAR } from '../../../constants';
import slug from 'slug';

export async function getInfoNews(id) {
    try {
        const hasNews = await News.findById(id)
            .select({ adminId: 0 })
            .lean();
        if (!hasNews) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        if (hasNews?.status !== true) return errorMessage(401, ERROR_CODE.UNAUTHORIZED);
        const idCates = hasNews.categories || [];
        const arrCategories = idCates.map(async (key) => {
            const temp = [];
            for (let i = 0; i < idCates.length; i += 1) {
                const hasCategories = await getCategoriesInfo(key);
                if (hasCategories._id !== '' && hasCategories._id) temp.push(hasCategories);
            }
            return temp[0];
        });
        const results = await Promise.all(arrCategories);
        return {
            images: isArray(hasNews.images) ? hasNews.images.map(image => GetFileData(SHARE_HOST, image)) : [],
            title: hasNews.title,
            meta_description: hasNews.meta_description,
            description: hasNews.description,
            content: hasNews.content,
            author: hasNews.author,
            tags: hasNews.tags,
            special_news: hasNews.special_news,
            _id: hasNews._id,
            avatar: GetFileData(SHARE_HOST, hasNews.avatar),
            categories: results.filter(item => item),
            createdAt: hasNews.createdAt
        };
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListNews(options) {
    try {
        const conditions = {};
        conditions.special_news = false;
        if (options?.keyword) {
            conditions.$or = [
                {
                    title: { $regex: options.keyword, $options: 'i' }
                },
                {
                    searchString: { $regex: slug(options.keyword, ' '), $options: 'i' }
                }
            ];
        }
        conditions.status = true;
        const results = await Promise.all([
            News.countDocuments(conditions),
            News.find(conditions).sort({ createdAt: -1 }).limit(options.limit).skip(options.skip)
        ]);
        const arrTemp = results[1].slice();
        const payloadNews = arrTemp.map(async (c) => {
            const temp = [];
            for (let i = 0; i < c.categories.length; i += 1) {
                const cate = await getCategoriesInfo(c.categories[i]);
                if (cate._id && cate._id !== '') temp.push(cate);
            }
            return {
                images: c.images ? c.images.map(image => GetFileData(SHARE_HOST, image)) : [],
                title: c.title,
                meta_description: c.meta_description,
                description: c.description,
                content: c.content,
                author: c.author,
                tags: c.tags,
                special_news: c.special_news,
                _id: c._id,
                avatar: GetFileData(SHARE_HOST, c.avatar),
                categories: temp,
                createdAt: c.createdAt
            };
        });
        return [results[0], await Promise.all(payloadNews)];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSpecialNews() {
    try {
        const hasSpecialNews = await News.find({ special_news: true }).select({ adminId: 0 });
        if (!hasSpecialNews[0]) return {};
        if (hasSpecialNews[0]?.status !== true) return errorMessage(401, ERROR_CODE.UNAUTHORIZED);
        if (hasSpecialNews[0].categories) {
            const idCates = hasSpecialNews[0].categories;
            const arrCategories = idCates.map(async (key) => {
                const temp = [];
                for (let i = 0; i < idCates.length; i += 1) {
                    const hasCategories = await getCategoriesInfo(key);
                    if (hasCategories._id !== '' && hasCategories._id) temp.push(hasCategories);
                }
                return temp[0];
            });
            const results = await Promise.all(arrCategories);
            return {
                images: isArray(hasSpecialNews[0].images) ? hasSpecialNews[0].images.map(image => GetFileData(SHARE_HOST, image)) : [],
                title: hasSpecialNews[0].title,
                meta_description: hasSpecialNews[0].meta_description,
                description: hasSpecialNews[0].description,
                content: hasSpecialNews[0].content,
                author: hasSpecialNews[0].author,
                tags: hasSpecialNews[0].tags,
                special_news: hasSpecialNews[0].special_news,
                _id: hasSpecialNews[0]._id,
                avatar: GetFileData(SHARE_HOST, hasSpecialNews[0].avatar),
                categories: results.filter(item => item)
            };
        }
        return hasSpecialNews[0];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function filterRelatedNews(id, options) {
    try {
        const payload = await Promise.all([
            News.find({ categories: { $in: [id] } }).countDocuments(),
            News.find({ categories: { $in: [id] } })
                .sort({ createdAt: 1 })
                .select({ adminId: 0 })
                .skip(options.skip)
                .limit(options.limit)
                .lean()
        ]);
        const payloadNews = payload[1].map(async (c) => {
            const temp = [];
            for (let i = 0; i < c.categories.length; i += 1) {
                const cate = await getCategoriesInfo(c.categories[i]);
                if (cate._id && cate._id !== '') temp.push(cate);
            }
            return {
                images: c.images ? c.images.map(image => GetFileData(SHARE_HOST, image)) : [],
                title: c.title,
                meta_description: c.meta_description,
                description: c.description,
                content: c.content,
                author: c.author,
                tags: c.tags,
                special_news: c.special_news,
                _id: c._id,
                avatar: c.avatar ? GetFileData(SHARE_HOST, c.avatar) : GetFileData(SHARE_HOST, DEFAULT_AVATAR),
                categories: temp
            };
        });
        return [payload[0], await Promise.all(payloadNews)];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
