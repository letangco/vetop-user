import slug from 'slug';
import bcrypt from 'bcryptjs';
import { searchUserBuilder } from '../../../../internal/elasticsearch/bodybuilder/bodybuilder';
import { UserElasticsearch } from '../../../server';
import { UserPayload } from '../../../../external/elasticsearch/user/user';
import { error500, errorMessage } from '../../../../external/util/error';
import { GetFileData } from '../../../../external/util/file';
import { ERROR_CODE, SHARE_HOST } from '../../../../external/constants/constants';
import { findOneAdminByCondDAO } from '../admin.dao';
import { BCRYPT_SALT_ROUNDS } from '../../../constants';
import { findOneUserByCondDAO } from '../../user/user.dao';
import { redisGet } from '../../../util/Redis';
import { getWalletSim } from '../../../../internal/grpc/wallet/request';
import { addHistoryPhoneNumber, getListPhoneNumberHistoryDAO, findOneHistoryChangePhoneNumberByCond, countHistoryPhoneNumberChangeByCond } from '../../changePhoneHistory/changePhoneHistory.dao';
import HistoryChangePhoneNumberModel from '../../changePhoneHistory/changePhoneHistory.model';

export async function searchUser(query) {
    try {
        query.keyword = slug(query?.keyword || ' ', ' ');
        const stringBuilder = searchUserBuilder(query);
        let data = await UserElasticsearch.SearchElement(UserPayload.index, stringBuilder);
        if (!data.status) {
            if (data.hits && data.hits.hits.length > 0) {
                data = data.hits.hits.map((d) => {
                    d._source.avatar = GetFileData(SHARE_HOST, JSON.parse(d._source.avatar));
                    return d._source;
                });
                return data;
            }
            return [];
        }
        return [];
    } catch (error) {
        return error500(error);
    }
}

export async function changePassword(auth, body) {
    try {
        const admin = await findOneAdminByCondDAO({ _id: auth._id });
        if (!admin) return errorMessage(403, ERROR_CODE.ACCOUNT_NOT_FOUND);
        const correctPassword = admin.comparePassword(body.prePassword);
        if (!correctPassword) return errorMessage(403, ERROR_CODE.PASSWORD_INVAILID);
        admin.password = bcrypt.hashSync(body.newPassword, BCRYPT_SALT_ROUNDS);
        await admin.save();
        return admin;
    } catch (error) {
        return error500(error);
    }
}

export async function changeProfile(auth, body) {
    try {
        const admin = await findOneAdminByCondDAO({ _id: auth._id });
        if (!admin) return errorMessage(403, ERROR_CODE.ACCOUNT_NOT_FOUND);
        admin.email = body?.email || admin.email;
        admin.fullName = body?.fullName || admin.fullName;
        await admin.save();
        return admin;
    } catch (error) {
        return error500(error);
    }
}

export async function verifyAccount(body) {
    try {
        const admin = await findOneAdminByCondDAO({ email: body.email });
        if (!admin) return errorMessage(403, ERROR_CODE.ACCOUNT_NOT_FOUND);
        const correctPassword = admin.comparePassword(body.password);
        if (!correctPassword) return errorMessage(403, ERROR_CODE.PASSWORD_INVAILID);
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function changePhoneNumberByAdmin(body) {
    try {
        const userProfile = await findOneUserByCondDAO({ phone: body.phone });
        if (!userProfile) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
        const userPhone = await findOneUserByCondDAO({ phone: body.newPhone });
        if (userPhone) return errorMessage(400, ERROR_CODE.EXISTS);
        const tempChange = {
            userId: userProfile._id,
            history: {
                currentPhone: userProfile.phone,
                newPhone: body.newPhone,
                type: 1, // Admin
                createdAt: new Date(Date.now()).toISOString(),
                updatedAt: new Date(Date.now()).toISOString(),
            }
        };
        const countDoc = await countHistoryPhoneNumberChangeByCond({ userId: userProfile._id });
        if (!countDoc) {
            await addHistoryPhoneNumber(tempChange);
        } else {
            await HistoryChangePhoneNumberModel.updateOne(
                { userId: userProfile._id },
                { $push: { history: tempChange.history } }
            );
        }
        await userProfile.updateOne({
            $set: {
                phone: body.newPhone
            }
        });
        return true;
    } catch (error) {
        return error500(error);
    }
}

export async function getListPhoneNumberHistory(options) {
    try {
        const list = await Promise.all([
            countHistoryPhoneNumberChangeByCond(),
            getListPhoneNumberHistoryDAO(options)
        ]);
        const payloadList = list[1].map(async (item) => {
            const history = await findOneUserByCondDAO({ _id: item.userId });
            const temp = item.toJSON();
            temp.code = history.code;
            temp.phone = history.phone;
            temp.fullName = history.fullName;
            temp.avatar = GetFileData(SHARE_HOST, history?.avatar);
            return temp;
        });
        const payloadResult = await Promise.all(payloadList);
        return [list[0], payloadResult];
    } catch (error) {
        return error500(error);
    }
}

export async function getInfoChangePhoneNumberHistory(id) {
    try {
        const history = await findOneHistoryChangePhoneNumberByCond({ userId: id });
        if (!history) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        const user = await findOneUserByCondDAO({ _id: history.userId });
        const temp = history.toJSON();
        temp.code = user.code;
        temp.phone = user.phone;
        temp.fullName = user.fullName;
        temp.avatar = GetFileData(SHARE_HOST, user?.avatar);
        return temp;
    } catch (error) {
        return error500(error);
    }
}
