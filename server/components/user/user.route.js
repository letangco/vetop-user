import { Router } from 'express';
import * as UserController from './user.controller';
import * as UserValidator from './user.validator';
import {isAdmin, isOwnerStore, isStore, isUser } from '../../../internal/auth/jwt';
import * as UserMulter from './user.multer';

const router = new Router();

router.route('/ping')
  .get(
    UserController.Pong
  );

router.route('/login/:type')
  .post(
    UserValidator.userLoginValidator,
    UserController.login,
  );

router.route('/default-store')
  .put(
    isUser.auth(),
    UserController.updateDefaultShop
  );

router.route('/get-store-user')
  .get(
    isUser.auth(),
    UserController.getStoreUser
  );

router.route('/register-check-phone')
  .post(
    UserValidator.userRegisterValidator,
    UserController.registerCheckPhone
  );
router.route('/register/:type')
  .post(
    UserValidator.registerNewAccount,
    UserController.register
  );
router.route('/verify-account')
  .post(
    UserController.verifyAccount
  );
router.route('/resend-verify-account')
  .post(
    UserController.resendVerifyAccount
  );
router.route('/resend-code')
  .post(
    UserController.resendCode
  );
router.route('/user-info/:id')
  .get(
    isUser.auth(),
    UserController.getUserInfoById
  );
router.route('/profile')
  .get(
    isUser.auth(),
    UserController.profileUser
  );

router.route('/update-profile')
  .put(
    isUser.auth(),
    UserController.updateProfile
  );

router.route('/check-code-user')
  .post(
    UserController.checkCodeUser
  );

router.route('/generate-code-user')
  .get(
    UserController.generalCodeList
  );

router.route('/get-code')
  .get(
    isUser.auth(),
    UserController.getUserCode
  );

router.route('/check-phone-number')
  .post(
    UserValidator.CHECK_PHONE_NUMBER,
    UserController.checkPhoneNumber
  );

router.route('/avatar')
  .put(
    isUser.auth(),
    UserController.uploadUserAvatar,
  );

router.route('/change-password')
  .put(
    isUser.auth(),
    UserValidator.changePasswordValidator,
    UserController.changePassword
  );

router.route('/forgot-password/:step')
  .post(
    UserController.forgotPassword
  );

router.route('/logout')
  .post(
    isUser.auth(),
    UserController.logout
  );

router.route('/change-phone-number/:step')
  .post(
    isUser.auth(),
    UserValidator.CHECK_PHONE_NUMBER,
    UserController.changePhoneNumber
  );

router.route('/:id')
  .delete(
    isUser.auth(),
    UserController.deleteUserById
  );

router.route('/search-code')
  .get(
    isUser.auth(),
    UserValidator.searchCode,
    UserController.searchCode
  );

router.route('/update-code')
  .put(
    isUser.auth(),
    UserController.updateNewCodeUser
  );

router.route('/gender')
  .get(
    isUser.auth(),
    UserController.getGender
  );

router.route('/best-code/')
  .get(
    UserController.getBestCode
  );

router.route('/dummy-code-vip')
  .post(
    UserController.dummyCodeVipRule
  );

router.route('/dummy-best-code')
  .post(
    UserController.dummyBestCode
  );

router.route('/code-vip/remove-all/')
  .delete(
    UserController.deleteCodeVip
  );

router.route('/search-user')
  .get(
    isOwnerStore.auth(),
    UserController.searchUser
  );

router.route('/search-all-user')
  .get(
    isStore.auth(),
    UserController.searchAllUser
  );

router.route('/get-qr-detail-info')
  .get(
    isUser.auth(),
    UserController.getInfoQR
  );

router.route('/sim-mall/change-phone')
  .put(
    isUser.auth(),
    UserController.changePhoneFromSim
  );

router.route('/change-sim-history')
  .get(
    isUser.auth(),
    UserController.getChangeSimHistory
  );

router.route('/change-status-invite')
  .put(
    isUser.auth(),
    UserController.changeStatusInvite
  );

router.route('/notification-change-code')
  .get(
    UserController.getNotificationChangeCode
  );

router.route('/api-test-tracking')
  .get(
    UserController.searchCodeTracking
  );

export default router;
