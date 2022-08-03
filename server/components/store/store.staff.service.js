import logger from '../../api/logger';
// import Store from './store.model';
import User from '../user/user.model';
import Staff from '../staff/staff.model';
import Store from './store.model';
import { error500, errorMessage } from '../../../external/util/error';
import {
  ERROR_CODE
} from '../../../external/constants/constants';
import { sendNotification } from '../notification/notification.service';
import { NOTIFICATION_TYPE } from '../../../external/constants/job_name';
import { getSalesRequest } from '../../../internal/grpc/store/request';
import { findOneUserByCondDAO } from '../user/user.dao';

/**
 * Create Staff For Store
 * @param {ObjectId} userId
 * @param {string} name
 * @param {string} description
 * @param {string} address
 * @param {string} phone
 * @param {ObjectId} countryId
 * @param {ObjectId} zoneId
 * @param {ObjectId} districtId
 * @param {object} company
 * @returns {Promise.<*>} The user model after create store information success or an error
 */
export async function createStaff(auth, userId, value) {
  try {
    if (userId.toString() === auth._id.toString()) return errorMessage(403, ERROR_CODE.NOT_INVITE_SELF);
    const hasUser = await User.findById(userId);
    if (!hasUser) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    const hasStore = await Store.findById(auth.storeId);
    if (!hasStore || !auth.storeId) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    // if (userId.toString() !== hasStore.userId.toString()) return errorMessage(403, ERROR_CODE.USER_NOT_ACCEPT);
    const staff = await Staff.findOne({
      userId,
      storeId: auth.storeId
    });
    if (staff) {
      return errorMessage(403, ERROR_CODE.STAFF_EXISTS);
    }
    const newStaff = new Staff({
      userId: userId,
      storeId: auth.storeId,
      paymentLimit: value
    });
    await newStaff.save();
    await sendNotification({
      targetId: auth.storeId,
      to: userId,
      data: {
        name: hasStore.name
      },
      type: NOTIFICATION_TYPE.INVITE_STAFF_TO_STORE
    });
    return newStaff;
  } catch (error) {
    console.log(error);
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Get Staff Information
 * @param {string} staffId
*/
export async function getStaffInfo(id) {
  try {
    let staff = await Staff.findById(id).lean();
    if (!staff) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    const promise = await Promise.all([getSalesRequest(staff._id), findOneUserByCondDAO({ _id: staff.userId })])
    staff.sales = promise[0].total;
    staff.userId = promise[1] || {};
    return staff;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * delete Staff
 * @param {string} staffId
*/
export async function deleteStaff(id) {
  try {
    const staff = await Staff.findById(id);
    if (!staff) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    return await staff.remove();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getStaffs(user, options) {
  try {
    const results = await Promise.all([
      Staff.countDocuments({ storeId: user.storeId }),
      Staff.find({ storeId: user.storeId }).sort({ createdAt: -1 }).limit(options.limit).skip(options.skip)
    ]);
    const promises = results[1].map(async (e) => {
      e = e.toObject();
      const user = await User.findById(e.userId);
      e.userId = user;
      return e;
    });
    return [results[0], await Promise.all(promises)];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
