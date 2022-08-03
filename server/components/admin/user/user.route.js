import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as UserController from './user.controller';
import * as AdminValidator from '../admin.validator';

const router = new Router();

router.route('/search')
  .get(
    UserController.searchUser
  );

router.route('/change-passwd')
  .put(
    isAdmin.auth(),
    AdminValidator.changePasswordAdmin,
    UserController.changePassword
  );

router.route('/change-profile')
  .put(
    isAdmin.auth(),
    AdminValidator.changeProfile,
    UserController.changeProfile
  );

router.route('/verify-account')
  .post(
    isAdmin.auth(),
    UserController.verifyAccount
  );

router.route('/change-phone-number')
  .post(
    isAdmin.auth(),
    AdminValidator.CHECK_PHONE_NUMBER,
    UserController.changePhoneNumberByAdmin
  );

router.route('/list-change-phone-number')
  .get(
    isAdmin.auth(),
    UserController.getListPhoneNumberHistory
  );

router.route('/info-change-phone-number/:id')
  .get(
    isAdmin.auth(),
    UserController.getInfoChangePhoneNumberHistory
  );

export default router;
