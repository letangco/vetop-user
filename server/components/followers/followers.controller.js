import * as FollowersService from './followers.service';
import * as StoreService from '../store/store.dao';
import * as UserDao from '../user/user.dao';
import { commonGetQuery } from '../../../external/middleware/query';
import { error500 } from '../../../external/util/error';
import { ERROR_CODE, SHARE_HOST } from '../../../external/constants/constants';
import { GetFileData } from '../../../external/util/file';

export async function addFollower(req, res) {
  try {
    const { storeId } = req.body;
    const { user } = req;
    const payload = await FollowersService.addFollower(user._id, storeId);
    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteFollower(req, res) {
  try {
    const { storeId } = req.body;
    const { user } = req;
    await FollowersService.deleteFollower(user._id, storeId);
    return res.RH.success();
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getFollowers(req, res) {
  try {
    const { user } = req;
    const query = commonGetQuery(req);
    const results = await FollowersService.getFollowers(user._id, query);
    if (results?.length > 1) {
     const promises = results[1].map(async (follow) => {
      follow = follow.toObject();
      const data = await StoreService.getStoreById(follow.storeId) || {};
      if (data?.avatar) {
        data.avatar = GetFileData(SHARE_HOST, data.avatar)
      }
      follow.storeId = data;
      return follow;
     });
      return res.RH.paging([results[0], await Promise.all(promises)], query.page, query.limit);
    }
    return res.RH.error(error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getFollowersByStore(req, res) {
  try {
    const { user } = req;
    const query = commonGetQuery(req);
    const results = await FollowersService.getFollowersByStore(user.storeId, query);
    if (results?.length > 1) {
      const promises = results[1].map(async (follow) => {
        follow = follow.toObject();
        const data = await UserDao.getUserById(follow.userId) || {}
        if (data?.avatar) {
          data.avatar = GetFileData(SHARE_HOST, data.avatar)
        }
        follow.userId = data;
        return follow;
       });
        return res.RH.paging([results[0], await Promise.all(promises)], query.page, query.limit);
    }
    return res.RH.error(error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR));
  } catch (error) {
    return res.RH.error(error);
  }
}
