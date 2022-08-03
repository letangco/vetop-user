/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-escape */
import { isArray } from 'lodash';
import QRCode from 'qrcode';
import nodeXlsx from 'node-xlsx';
import slug from 'slug';
import { DEFAULT_AVATAR, DEFAULT_AVATAR_STORE, ERROR_CODE, SHARE_HOST } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import { createAdminDAO, findOneAdminByCondDAO } from './admin.dao';
import logger from '../../api/logger';
import User from '../user/user.model';
import Store from '../store/store.model';
import Staff from '../staff/staff.model';
import SlideShow from './slideshow/slideManagement.model';
import News from './news/news.model';
import { findCodeByCondDAO, findOneCodeByCond } from '../user/code.dao';
import {
    getCategoriesInfo,
    getCategoriesStoreByAdmin,
    getProductByStoreCategoriesByAdmin
} from '../../../internal/grpc/store/request';
import { getIdFANAdmin } from '../../../internal/grpc/wallet/request';
import { GetFileData, updateLinkImageByAdmin } from '../../../external/util/file';
import { USER_STATUS, STORE_STATUS, PRODUCT_STATUS } from '../../constants';
import LinkModel from '../link/link.model';
import { getSort } from '../../../external/middleware/query';
import Country from '../country/country.model';
import State from '../state/state.model';
import { getUserById, getUserByIdAndCondition, findOneUserByCondDAO } from '../user/user.dao';

export async function loginService(body) {
    try {
        const hasAccount = await findOneAdminByCondDAO({ email: body.email });
        if (!hasAccount) return errorMessage(400, ERROR_CODE.ACCOUNT_NOT_FOUND);
        const comparePassword = hasAccount.comparePassword(body.password);
        if (!comparePassword) return errorMessage(400, ERROR_CODE.PASSWORD_INVALID);
        const token = hasAccount.signJWT();
        const dataAdmin = hasAccount.toJSON();
        dataAdmin.token = token;
        dataAdmin.avatar = GetFileData(SHARE_HOST, hasAccount.avatar);
        return dataAdmin;
    } catch (error) {
        return error500(error);
    }
}

export async function createAccountAdminService(body) {
    try {
        const hasEmail = await findOneAdminByCondDAO({ email: body.email });
        if (hasEmail) return errorMessage(400, ERROR_CODE.EMAIL_EXISTS);
        return await createAdminDAO(body);
    } catch (error) {
        return error500(error);
    }
}

export async function getUsers(options) {
    try {
        const { keyword } = options;
        let conditions = [];
        if (keyword) {
            conditions = [
                { fullName: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
                { phone: { $regex: keyword, $options: 'i' } },
            ];
        }
        const results = await Promise.all([
            (await User.find(keyword ? { $or: conditions } : {})).length,
            User.find(keyword ? { $or: conditions } : {})
                .sort({ fullName: 1 })
                .select({ password: 0 })
                .skip(options.skip)
                .limit(options.limit)
                .lean()
        ]);
        return [results[0], results[1]];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getUserByIdService(id) {
    try {
        let hasUser = await User.findById(id).select({ password: 0 });
        if (!hasUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        // refer
        const refer = await findOneUserByCondDAO({ _id: hasUser.refer });
        // list id FAN
        const listIdFAN = await getIdFANAdmin(hasUser._id);
        const payloadlistIdFAN = listIdFAN?.idfans;
        // -------------------------
        hasUser = await hasUser.metaDataProfileUser();
        const result = payloadlistIdFAN ? await payloadlistIdFAN.map(async (item) => {
            const user = await getUserByIdAndCondition(item.user, {
                code: 1, fullName: 1, _id: 1
            });
            return {
                _id: item._id,
                total: item.total,
                commission: item.commission,
                user: user,
                refer: {
                    _id: hasUser._id,
                    code: hasUser.code,
                    fullName: hasUser.fullName
                },
                createdAt: item.createdAt
            };
        }) : [];
        hasUser.idFans = await Promise.all(result);
        hasUser.totalIdFan = listIdFAN.totalIdFan;
        hasUser.totalVetic = listIdFAN.totalVetic;
        hasUser.totalCommission = listIdFAN.totalCommission;
        hasUser.refer = {
            _id: refer?._id,
            code: refer?.code,
            phone: refer?.phone
        };
        return hasUser;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getReferUsers(options) {
    try {
        const { keyword } = options;
        let conditions = [];
        if (keyword) {
            conditions = [
                { fullName: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
                { phone: { $regex: keyword, $options: 'i' } },
            ];
        }
        const listReferUser = await Promise.all([
            (await User.find(keyword ? { $or: conditions, refer: { $ne: null } } : { refer: { $ne: null } })).length,
            User.find(keyword ? { $or: conditions, refer: { $ne: null } } : { refer: { $ne: null } })
                .sort({ fullName: 1 })
                .select({ password: 0 })
                .skip(options.skip)
                .limit(options.limit)
                .lean()
        ]);
        return [listReferUser[0], listReferUser[1]];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

function isISOString(value) {
    return new Date(value).toJSON() === value;
}

const generateQR = async (text) => {
    try {
        const result = await QRCode.toDataURL(text.toString(), {
            errorCorrectionLevel: 'H', version: 4, width: 500, margin: 1.5
        });
        return result;
    } catch (err) {
        return err;
    }
};

export async function getFilterUsers(options) {
    try {
        let keyword;
        if (options?.keyword) {
            keyword = slug(options?.keyword, ' ');
        } else keyword = '';
        const conditionSearchs = [];
        const conditionAll = {};
        if (keyword) {
            conditionSearchs.push(
                { fullName: { $regex: keyword, $options: 'i' } },
                { phone: { $regex: keyword, $options: 'i' } },
                { code: { $regex: keyword } },
                { searchString: { $regex: keyword, $options: 'i' } },
            );
        } else {
            conditionSearchs.push(
                { searchString: { $regex: '', $options: 'i' } },
            );
        }
        conditionAll.['$or'] = conditionSearchs;
        switch (options.status) {
            case '1':
            case '2':
            case '3':
                conditionAll.status = options.status;
                break;
            case '':
            case undefined:
                break;
            default:
                return errorMessage(400, ERROR_CODE.STATUS_INVALID);
        }
        const fromDay = options.fromDay ? new Date(options.fromDay).toISOString() : null;
        const toDay = options.toDay ? new Date(options.toDay).toISOString() : null;
        if (options.fromDay && options.toDay) {
            conditionAll.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        } else if (options.fromDay && !options.toDay) {
            conditionAll.createdAt = {
                $gte: fromDay
            };
        } else if (!options.fromDay && options.toDay) {
            conditionAll.createdAt = {
                $lt: toDay
            };
        }
        const payload = await Promise.all([
            User.find(conditionAll).countDocuments(),
            User.find(conditionAll)
                .sort({ fullName: 1 })
                .select({ password: 0 })
                .skip(options.skip)
                .limit(options.limit)
                .lean()
        ]);
        const dataUserFullAvatar = payload[1].map(async (user) => {
            const refer = await findOneUserByCondDAO({ _id: user.refer });
            return {
                _id: user._id,
                fullName: user.fullName,
                avatar: GetFileData(SHARE_HOST, user.avatar),
                phone: user.phone,
                address: user.address,
                email: user.email,
                code: user.code,
                rate: user.rate,
                online: user.online,
                gender: user.gender,
                status: user.status,
                refer: {
                    _id: refer?._id,
                    code: refer?.code,
                    phone: refer?.phone
                },
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        });
        return [payload[0], await Promise.all(dataUserFullAvatar)];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
// Store
export async function getFilterStores(options) {
    try {
        let keyword;
        if (options?.keyword) {
            keyword = slug(options?.keyword, ' ');
        } else keyword = '';
        const conditionSearchs = [];
        const conditionAll = {};
        if (keyword) {
            conditionSearchs.push(
                { code: { $regex: keyword } },
                { phone: { $regex: keyword } },
                { name: { $regex: keyword, $options: 'i' } },
                { searchString: { $regex: keyword, $options: 'i' } }
            );
        } else {
            conditionSearchs.push(
                { searchString: { $regex: '', $options: 'i' } },
            );
        }
        conditionAll.['$or'] = conditionSearchs;
        switch (options.status) {
            case STORE_STATUS.INACTIVE.toString():
            case STORE_STATUS.PENDING.toString():
            case STORE_STATUS.ACTIVE.toString():
                conditionAll.status = Number(options.status);
                break;
            case '':
            case undefined:
                break;
            default:
                return errorMessage(400, ERROR_CODE.STATUS_INVALID);
        }
        const fromDay = options.fromDay ? new Date(options.fromDay).toISOString() : null;
        const toDay = options.toDay ? new Date(options.toDay).toISOString() : null;
        if (fromDay && toDay) {
            if (fromDay > toDay) {
                return errorMessage(400, ERROR_CODE.DATE_INVALID);
            }
            conditionAll.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        }
        if (!fromDay && toDay) {
            conditionAll.createdAt = {
                $lt: toDay
            };
        }
        if (fromDay && !toDay) {
            conditionAll.createdAt = {
                $gte: fromDay,
            };
        }
        const payload = await Promise.all([
            Store.find(conditionAll).countDocuments(),
            Store.find(conditionAll)
                .sort({ createdAt: -1 })
                .skip(options.skip)
                .limit(options.limit)
        ]);
        const result = payload[1].map(async store => await getStoreByIdAdmin(store._id));
        return [payload[0], await Promise.all(result)];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getStoreByIdAdmin(id) {
    try {
        let hasStore = await Store.findById(id).select({ __v: 0, searchString: 0 });
        if (!hasStore) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        hasStore = hasStore.toObject();
        if (hasStore?.avatar) {
            hasStore.avatar = GetFileData(SHARE_HOST, hasStore.avatar);
        }
        if (hasStore?.userId) {
            const userInfo = await User.findById(hasStore.userId)
                .select({ password: 0 });
            if (!userInfo) {
                hasStore.userId = {};
            } else {
                hasStore.userId = {
                    _id: userInfo._id,
                    fullName: userInfo.fullName,
                    avatar: userInfo.avatar ? GetFileData(SHARE_HOST, userInfo.avatar) : {},
                    phone: userInfo.phone,
                    address: userInfo.address,
                    email: userInfo.email,
                    status: userInfo.status,
                    code: userInfo.code,
                    rate: userInfo.rate,
                    gender: userInfo.gender,
                };
            }
        }
        if (hasStore?.countryId) {
            const countryInfo = await Country.findById(hasStore.countryId).select({ __v: 0 });
            hasStore.countryId = countryInfo || {};
        }
        if (hasStore?.stateId) {
            const stateInfo = await State.findById(hasStore.stateId).select({ __v: 0, searchString: 0, countryId: 0 });
            hasStore.stateId = stateInfo || {};
        }
        const categories = await getCategoriesStoreByAdmin(hasStore._id);
        hasStore.storeCategories = categories.categories;
        return hasStore;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getStaffsStore(id, options) {
    try {
        const hasStore = await Store.findById(id);
        if (!hasStore) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        const listIdStaff = await Staff.find({ storeId: id })
            .select('userId')
            .skip(options.skip)
            .limit(options.limit)
            .lean();
        const payloadStaffs = listIdStaff.map(async (c) => {
            const staff = await User.findById(c.userId);
            return staff.metaDataProfileUser();
        });
        const payload = await Promise.all(payloadStaffs);
        return [await Staff.find({ storeId: id }).countDocuments().lean(), payload];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function createSlideShow(data) {
    try {
        if (!data.image) return errorMessage(404, ERROR_CODE.SLIDE_SHOW_NOT_FOUND);
        const hasSlide = await SlideShow.countDocuments();
        if (!hasSlide) {
            data.index = 1;
        } else {
            const listSortSlide = await SlideShow.find().sort({ index: -1 });
            if (!listSortSlide[0].index) {
                await listSortSlide[0].updateOne(
                    {
                        $set: { index: 1 }
                    }
                );
                data.index = 2;
            } else {
                data.index = parseInt(listSortSlide[0].index, 10) + 1;
            }
        }
        return await SlideShow.create(data);
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateSlideShowService(id, data) {
    try {
        const hasSlide = await SlideShow.findById(id);
        if (!hasSlide) return errorMessage(404, ERROR_CODE.SLIDE_SHOW_NOT_FOUND);
        await hasSlide.updateOne(
            {
                $set: {
                    image: data.image ? updateLinkImageByAdmin(data.image, SHARE_HOST) : hasSlide.image,
                    title: data.title ? data.title : hasSlide.title,
                }
            }
        );
        return true;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteSlideShow(id) {
    try {
        const hasSlide = await SlideShow.findById(id);
        if (!hasSlide) return errorMessage(404, ERROR_CODE.SLIDE_SHOW_NOT_FOUND);
        await hasSlide.remove();
        const arrSlide = await SlideShow.find().sort({ index: 1 });
        for (let i = 0; i < arrSlide.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await arrSlide[i].updateOne({ $set: { index: i + 1 } });
        }
        return true;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

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

export async function sortSlideByAdmin(body) {
    try {
        if (!body.slides.length) return errorMessage(404, ERROR_CODE.SLIDE_SHOW_NOT_FOUND);
        for (let i = 0; i < body.slides.length; i += 1) {
            const hasSlide = await SlideShow.findById(body.slides[i]._id);
            if (hasSlide) {
                await hasSlide.updateOne({
                    $set: { index: i + 1 }
                });
            }
        }
        return await SlideShow.find().sort({ index: 1 });
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function selectTypeCode(type) {
    try {
        const code = await findOneCodeByCond({ type: type });
        if (!code) return errorMessage(404, ERROR_CODE.CODE_NOT_FOUND);
        const statusCode = await findOneCodeByCond({ status: true });
        if (statusCode) {
            statusCode.status = false;
            await statusCode.save();
        }
        code.status = true;
        await code.save();
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function createNewsByAdmin(body, auth) {
    try {
        const errCate = [];
        if (body?.images.length) {
            body.images = body.images.map(item => updateLinkImageByAdmin(item, SHARE_HOST));
            body.avatar ? body.avatar = updateLinkImageByAdmin(body.avatar, SHARE_HOST) : body.avatar = updateLinkImageByAdmin(body.images[0], SHARE_HOST);
        } else {
            body.avatar = updateLinkImageByAdmin(body.avatar, SHARE_HOST);
            const arrImg = [];
            arrImg.push(updateLinkImageByAdmin(DEFAULT_AVATAR_STORE, SHARE_HOST));
            body.images = arrImg;
        }
        body.adminId = auth._id;
        body.author = body.author || auth.fullName;
        body.searchString = slug(`${body.title} ${body.author}`, ' ');
        if (body.categories) {
            const promise = body.categories.map(async (id) => {
                const hasCategories = await getCategoriesInfo(id);
                if (!hasCategories._id) errCate.push(id);
                return errCate;
            });
            await Promise.all(promise);
            if (errCate.length) return errorMessage(404, `${ERROR_CODE.CATEGORY_NOT_FOUND} ${errCate}`);
        }
        return await News.create(body);
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteNewsByAdmin(id) {
    try {
        const hasNews = await News.findById(id);
        if (!hasNews) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        if (hasNews?.special_news) return errorMessage(400, ERROR_CODE.CAN_NOT_DELETE);
        await hasNews.remove();
        return true;
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateNewsByAdmin(id, body, auth) {
    try {
        const hasNews = await News.findById(id);
        if (!hasNews) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        // body.avatar = body.images ? body.images[0] : hasNews.avatar;
        const errCate = [];
        if (body.categories) {
            const promise = body.categories.map(async (item) => {
                const hasCategories = await getCategoriesInfo(item);
                if (!hasCategories._id) errCate.push(item);
                return errCate;
            });
            await Promise.all(promise);
            if (errCate.length) return errorMessage(404, `${ERROR_CODE.CATEGORY_NOT_FOUND} ${errCate}`);
        }
        if (body?.images) {
            body.images = body.images.map(item => updateLinkImageByAdmin(item, SHARE_HOST));
            if (body.avatar) {
                body.avatar = updateLinkImageByAdmin(body.avatar, SHARE_HOST);
            } else {
                hasNews.avatar ? body.avatar = updateLinkImageByAdmin(body.images[0], SHARE_HOST) : body.avatar = hasNews.avatar;
            }
        } else {
            body.avatar ? body.avatar = updateLinkImageByAdmin(body.avatar, SHARE_HOST) : body.avatar = hasNews.avatar;
        }
        body.adminId = auth._id;
        body.author = body.author || auth.fullName;
        if (body.title !== hasNews.name || body.author) {
            body.searchString = slug(`${body.title} ${body.author}`, ' ');
        }
        body.special_news = hasNews.special_news;
        Object.keys(body)
            .forEach((key) => {
                hasNews[key] = body[key];
            });
        return await hasNews.save();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function chooseSpecialNews(id) {
    try {
        const hasNews = await News.findById(id);
        if (!hasNews) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await News.updateMany({ special_news: true }, { $set: { special_news: false } });
        await hasNews.updateOne(
            {
                $set: {
                    special_news: true,
                }
            }
        );
        return await News.findById(id).select({ adminId: 0 }).lean();
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getListNews(options) {
    try {
        const conditions = {};
        // conditions.special_news = false;
        if (options?.keyword) {
            conditions.$or = [
                {
                    searchString: { $regex: slug(options.keyword, ' '), $options: 'i' }
                },
                {
                    title: { $regex: slug(options.keyword, ' '), $options: 'i' }
                }
            ];
        }
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
                createdAt: c.createdAt,
                status: c.status
            };
        });
        return [results[0], await Promise.all(payloadNews)];
    } catch (error) {
        logger.error(error);
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getInfoNews(id) {
    try {
        const hasNews = await News.findById(id)
            .select({ adminId: 0 })
            .lean();
        if (!hasNews) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
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

export async function getSpecialNews() {
    try {
        const hasSpecialNews = await News.find({ special_news: true }).select({ adminId: 0 });
        if (!hasSpecialNews[0]) return {};
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

export async function getInfoUserService(auth) {
    try {
        if (auth.avatar) auth.avatar = GetFileData(SHARE_HOST, auth.avatar);
        return auth;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStatusUserByIdService(id, status) {
    try {
        if (!status) return errorMessage(ERROR_CODE.STATUS_INVALID);
        const hasUser = await User.findById(id);
        if (!hasUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        if (!Object.values([String(USER_STATUS.ACTIVE), String(USER_STATUS.INACTIVE), String(USER_STATUS.PENDING)]).includes(String(status))) {
            return errorMessage(400, ERROR_CODE.TYPE_STATUS_USER_INVALID);
        }
        await hasUser.updateOne(
            {
                $set: {
                    status: status
                }
            }
        );
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStatusStoreById(id, status) {
    try {
        if (!status) return errorMessage(ERROR_CODE.STATUS_INVALID);
        const hasStore = await Store.findById(id);
        if (!hasStore) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        if (!Object.values([String(STORE_STATUS.ACTIVE), String(STORE_STATUS.INACTIVE), String(STORE_STATUS.PENDING)]).includes(String(status))) {
            return errorMessage(400, ERROR_CODE.TYPE_STATUS_USER_INVALID);
        }
        await hasStore.updateOne(
            {
                $set: {
                    status: status
                }
            }
        );
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function createListLinked(body) {
    try {
        if (!body?.link) return errorMessage(400, ERROR_CODE.LINK_NOT_EMPTY);
        const hasLinked = await LinkModel.countDocuments();
        if (!hasLinked) {
            body.index = 1;
        } else {
            const listLinked = await LinkModel.find().sort({ index: -1 });
            if (!listLinked[0].index) {
                await listLinked[0].updateOne(
                    {
                        $set: { index: 1 }
                    }
                );
                body.index = 2;
            } else {
                body.index = parseInt(listLinked[0].index, 10) + 1;
            }
        }
        return await LinkModel.create(body);
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteLinkByIdService(id) {
    try {
        const hasLink = await LinkModel.findById(id);
        if (!hasLink) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await hasLink.remove();
        const arrLinks = await LinkModel.find().sort({ index: 1 });
        for (let i = 0; i < arrLinks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await arrLinks[i].updateOne({ $set: { index: i + 1 } });
        }
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateLinkedById(id, body) {
    try {
        const hasLinked = await LinkModel.findById(id);
        if (!hasLinked) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await hasLinked.updateOne(
            {
                $set: {
                    icon: body.icon ? body.icon : hasLinked.icon,
                    title: body.title ? body.title : hasLinked.title,
                    link: body.link ? body.link : hasLinked.link
                }
            }
        );
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function sortListLinkedByIdService(body) {
    try {
        if (!body.links.length) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        for (let i = 0; i < body.links.length; i += 1) {
            const hasLink = await LinkModel.findById(body.links[i]._id);
            if (hasLink) {
                await hasLink.updateOne({
                    $set: { index: i + 1 }
                });
            }
        }
        return await LinkModel.find().sort({ index: 1 });
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getLinkInfoService(id) {
    try {
        const hasLinked = await LinkModel.findById(id);
        if (!hasLinked) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
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
        // conditions.link = { $exists: true, $ne: '' };
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

function insertItemAtPositionK(arr, n, k, x) {
    for (let i = n; i >= k; i--) {
        arr[i] = arr[i - 1];
    }
    arr[k] = x;
    n++;
    return arr;
}

export async function exportUserXlsByAdminService(options) {
    try {
        let keyword;
        if (options?.keyword) {
            keyword = slug(options?.keyword);
        } else keyword = '';
        const conditionSearchs = [];
        const conditionAll = {};
        if (keyword) {
            conditionSearchs.push(
                { fullName: { $regex: keyword, $options: 'i' } },
                { code: { $regex: keyword } },
                { searchString: { $regex: keyword, $options: 'i' } },
            );
        } else {
            conditionSearchs.push(
                { searchString: { $regex: '', $options: 'i' } },
            );
        }
        conditionAll.['$or'] = conditionSearchs;
        switch (options.status) {
            case '1':
            case '2':
            case '3':
                conditionAll.status = options.status;
                break;
            case '':
            case undefined:
                break;
            default:
                return errorMessage(400, ERROR_CODE.STATUS_INVALID);
        }
        const fromDay = options.fromDay ? new Date(options.fromDay).toISOString() : null;
        const toDay = options.toDay ? new Date(options.toDay).toISOString() : null;
        if (options.fromDay && options.toDay) {
            conditionAll.createdAt = {
                $gte: fromDay,
                $lt: toDay
            };
        } else if (options.fromDay && !options.toDay) {
            conditionAll.createdAt = {
                $gte: fromDay
            };
        } else if (!options.fromDay && options.toDay) {
            conditionAll.createdAt = {
                $lt: toDay
            };
        }
        const dataExcel = [];
        const users = await User.find(conditionAll);
        const promise = users.map(async (user) => {
            const item = user.toObject();
            const refer = await User.findById(item.refer);
            refer ? item.refer = refer.code : '';
            item.avatar = `${SHARE_HOST}/lg/${user.avatar.large}`;
            switch (item.gender) {
                case 1:
                    item.gender = 'MALE';
                    break;
                case 2:
                    item.gender = 'FEMALE';
                    break;
                default:
                    item.gender = 'OTHER';
                    break;
            }
            switch (item.status) {
                case 1:
                    item.status = 'ACTIVE';
                    break;
                case 2:
                    item.status = 'INACTIVE';
                    break;
                default:
                    item.status = 'PENDING';
                    break;
            }
            return item;
        });
        const payload = await Promise.all(promise);
        const headerFinal = ['_id', 'code', 'Họ và tên', 'Email', 'Giới tính', 'Ảnh đại diện', 'Địa chỉ', 'SĐT', 'Mã giới thiệu', 'Đánh giá', 'Thời gian đăng kí', 'Trạng thái'];
        const arrHeader = ['_id', 'code', 'fullName', 'email', 'gender', 'avatar', 'address', 'phone', 'refer', 'rate', 'createdAt', 'status'];
        const dif = ['password', 'searchString', '__v', 'online'];
        for (let i = 0; i < dif.length; i++) {
            for (let j = 0; j < arrHeader.length; j++) {
                if (arrHeader[j] === dif[i]) {
                    arrHeader.splice(j, 1);
                    break;
                }
            }
        }
        const range = { s: { c: 0, r: 0 }, e: { c: arrHeader.length - 1, r: 0 } };
        const optionsMerge = { '!merges': [range] };
        dataExcel.push(['DANH SÁCH NGƯỜI DÙNG']);
        dataExcel.push(headerFinal);
        for (const item of payload) {
            const data = [];
            const header = [...new Set(arrHeader)];
            const keyUser = Object.keys(item);
            for (let i = 0; i < header.length; i++) {
                for (let j = 0; j < keyUser.length; j++) {
                    if (header[i] === keyUser[j]) {
                        insertItemAtPositionK(data, data.length, i, item[keyUser[j]]);
                        break;
                    }
                }
            }
            dataExcel.push(data);
        }
        const buffer = nodeXlsx.build([{ name: 'Sheet1', data: dataExcel }], optionsMerge);
        return ['users.xlsx', buffer];
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateAvatarAdminService(auth, body) {
    try {
        const admin = await findOneAdminByCondDAO({ _id: auth._id });
        if (!admin) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await admin.updateOne({
            $set: { avatar: updateLinkImageByAdmin(body, SHARE_HOST) }
        });
        return true;
    } catch (error) {
        logger.error(error);
        return error500(ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
