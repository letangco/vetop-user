import { JWT, CreateAuth } from '@tggs/core-authencation';
import { JWT_SECRET_KEY } from '../config';

import User from '../../server/components/user/user.model';
import Store from '../../server/components/store/store.model';
import Admin from '../../server/components/admin/admin.model';
import APIError from '../../external/util/APIError';

import jwt from 'jsonwebtoken';
import staffModel from '../../server/components/staff/staff.model';

export const jwt_user = new JWT({
  jwtKey: JWT_SECRET_KEY,
  expiredTime: 2592000000
});

/**
 * JWT User
 * */
export const isUser = new CreateAuth('user', jwt_user.getJWTKey(), 'bearer', async (token, done) => {
  try {
    // eslint-disable-next-line new-cap
    if (token.access === 'store') {
      const user = await Store.findById(token._id.toString());
      if (!user?._id) {
        return done(null, false);
      }
      return done(null, {
        _id: user.userId,
        storeId: token._id.toString()
      });
    }
    const user = await User.findOne({
      _id: token._id.toString(),
      status: 1
    });
    // eslint-disable-next-line new-cap
    if (token.access === 'staff') {
      const staff = await staffModel.findById(token?.staffId.toString() || '');
      if (!staff?._id) {
        return done(null, false);
      }
      return done(null, {
        _id: staff.userId,
        storeId: token._id.toString(),
        staffId: staff._id.toString()
      });
    }
    if (!user?._id) {
      return done(null, false);
    }
    return done(null, {
      _id: user._id
    });
  } catch (e) {
    return done(e);
  }
});

/**
 * JWT Store
 * */
export const isOwnerStore = new CreateAuth('store', jwt_user.getJWTKey(), 'bearer', async (token, done) => {
  try {
    // eslint-disable-next-line new-cap
    if (token.access !== 'store') {
      return done(null, false);
    }
    const user = await Store.findById(token._id.toString());
    if (!user?._id) {
      return done(null, false);
    }
    return done(null, {
      _id: user.userId,
      storeId: token._id.toString()
    });
  } catch (e) {
    return done(e);
  }
});

/**
 * JWT Store
 * */
export const isStore = new CreateAuth('store', jwt_user.getJWTKey(), 'bearer', async (token, done) => {
  try {
    // eslint-disable-next-line new-cap
    if (token.access === 'user') {
      return done(null, false);
    }
    const user = await Store.findById(token._id.toString());
    if (!user?._id) {
      return done(null, false);
    }
    if (token.access === 'staff') {
      const staff = await staffModel.findById(token?.staffId || '');
      if (!staff) {
        return done(null, false);
      }
      return done(null, {
        _id: user.userId.toString(),
        storeId: token._id.toString(),
        staffId: staff._id.toString()
      });
    }
    return done(null, {
      _id: user.userId,
      storeId: token._id.toString()
    });
  } catch (e) {
    return done(e);
  }
});

export const isAdmin = new CreateAuth('admin', jwt_user.getJWTKey(), 'bearer', async (token, done) => {
  try {
    const user = await Admin.findById(token._id.toString()).select({ password: 0 });
    if (!user?._id) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

export const isAuthorized = () => async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next();
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
      if (userData.access === 'store') {
        const user = await Store.findById(userData._id.toString());
        if (!user?._id) {
          return next(new APIError(401, 'Unauthorized'));
        }
        req.user = {
          _id: user.userId,
          storeId: userData._id.toString()

        };
        return next();
      }
      if (userData.access === 'staff') {
        const staff = await staffModel.findById(userData.staffId.toString());
        if (!staff?._id) {
          return next(new APIError(401, 'Unauthorized'));
        }
        req.user = {
          _id: staff.userId,
          storeId: staff.storeId.toString(),
          staffId: staff._id.toString()
        };
        return next();
      }
      const user = await User.findOne({
        _id: userData._id.toString(),
        status: 1
      });
      if (!user?._id) {
      return next(new APIError(401, 'Unauthorized'));
      }
      req.user = {
        _id: user._id
      };
      return next();
    }
    return next();
  };
