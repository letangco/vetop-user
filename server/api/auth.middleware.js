import jwt from 'jsonwebtoken';
import APIError from '../util/APIError';
import { JWT_SECRET_KEY } from '../config';
import User from '../components/user/user.model';
import Admin from '../components/admin/admin.model';
import Store from '../components/store/store.model';
import Staff from '../components/staff/staff.model';

/**
 * Check user permission by role, status and permission
 * @returns {function(*, *, *)}
 */
export function isAuthorized() {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next(new APIError(401, 'Unauthorized'));
    }
    const authorizationArray = authorization.split(' ');
    if (authorizationArray[0] === 'Bearer') {
      const token = authorizationArray[1];
      let userData;
      try {
        userData = jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        return next(new APIError(401, 'Unauthorized'));
      }
      req.auth = await User.findOne({
        _id: userData._id,
        status: 1
      }).select({
        password: 0,
        status: 0
      });
      if (!req.auth) {
        return next(new APIError(401, 'Unauthorized'));
      }
      if (userData.storeId) {
        const storeInfo = await Store.findById(userData.storeId);
        if (!storeInfo || userData._id.toString() !== storeInfo.userId.toString()) {
          return next(new APIError(401, 'Unauthorized'));
        }
        req.auth.storeId = userData.storeId;
      }
      if (userData.staffId) {
        const staffInfo = await Staff.findById(userData.staffId);
        if (!staffInfo) {
          return next(new APIError(401, 'Unauthorized'));
        }
        req.auth.staffId = userData.staffId;
      }
      req.auth.access = userData.access;
      return next();
    }
    return next(new APIError(401, 'Unauthorized'));
  };
}

export function isAuthorizedAdmin() {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next(new APIError(401, 'Unauthorized'));
    }
    const authorizationArray = authorization.split(' ');
    if (authorizationArray[0] === 'bearer') {
      const token = authorizationArray[1];
      let userData;
      try {
        userData = jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        return next(new APIError(401, 'Unauthorized'));
      }
      const auth = await Admin.findOne({ _id: userData._id }).select({ password: 0 });
      if (!auth) return next(new APIError(401, 'Unauthorized'));
      req.auth = auth;
      return next();
    }
    return next(new APIError(401, 'Unauthorized'));
  };
}
