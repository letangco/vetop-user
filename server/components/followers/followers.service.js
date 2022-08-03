import logger from '../../api/logger';
import Followers from './followers.model';
import { error500, errorMessage } from '../../../external/util/error';
import { ERROR_CODE, SUCCESS_CODE } from '../../../external/constants/constants';
import { sendNotification } from '../notification/notification.service';
import { getUserById } from '../user/user.dao';
import { NOTIFICATION_TYPE } from '../../../external/constants/job_name';

/**
 * Create Followers
 * @param {string} userId
 * @param {string} follower
 * @returns {Promise.<*>} The Followers model after create success or an error
 */
export async function addFollower(userId, storeId) {
  try {
    const user = await getUserById(userId);
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const hasFollow = await Followers.findOne({ userId, storeId });
    if (hasFollow) {
      await sendNotification({
        targetId: hasFollow._id,
        to: hasFollow.storeId,
        data: {
          sender: user.fullName
        },
        type: NOTIFICATION_TYPE.USER_UNFOLLOW_STORE
      });
      await hasFollow.remove();
      return SUCCESS_CODE.UNFOLLOW_SUCCESS;
    }
    const newFollowers = new Followers({
      userId,
      storeId
    });
    await newFollowers.save();
    await sendNotification({
      targetId: newFollowers._id,
      to: newFollowers.storeId,
      data: {
        sender: user.fullName
      },
      type: NOTIFICATION_TYPE.USER_FOLLOW_STORE
    });
    return SUCCESS_CODE.FOLLOW_SUCCESS;
  } catch (error) {
    logger.error('addFollower error: ', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Delete Followers
 * @param {string} followerId
 * @returns {Promise.<*>} The Followers model after delete success or an error
 */
export async function deleteFollower(userId, storeId) {
  try {
    const follower = await Followers.findOne({
      userId,
      storeId
    }).lean();
    if (!follower) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    return await follower.remove();
  } catch (error) {
    logger.error('Delete follower error: ', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Get all followers by user
 * @returns {Promise.<*>} The followers model after get all success or an error
 */
export async function getFollowers(userId, query) {
  try {
    const conditions = { userId };
    const promises = [
      Followers.countDocuments(conditions),
      Followers.find(conditions).sort({ createdAt: -1 }).limit(query.limit).skip(query.skip)
    ];
    return await Promise.all(promises);
  } catch (error) {
    logger.error('Followers get all error: ', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Get all followers by store
 * @returns {Promise.<*>} The followers model after get all success or an error
 */
export async function getFollowersByStore(storeId, query) {
  try {
    const conditions = { storeId };
    const promises = [
      Followers.countDocuments(conditions),
      Followers.find(conditions).sort({ createdAt: -1 }).limit(query.limit).skip(query.skip)
    ];
    return await Promise.all(promises);
  } catch (error) {
    logger.error('Followers get all error: ', error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
