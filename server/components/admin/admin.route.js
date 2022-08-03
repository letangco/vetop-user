/* eslint-disable import/no-cycle */
import { Router } from 'express';
import * as adminController from './admin.controller';
import * as adminValidator from './admin.validator';
import Problem from './problem/problem.route';
import BankList from './bankList/bankList.router';
import { isAdmin } from '../../../internal/auth/jwt';
import LocationDefaultRouter from './locationDefault/locationDefault.route';
import Code from './code/code.route';
import UserRouter from './user/user.route';
import PolicyRouter from './policy/policy.route';
import RemoveDataRouter from './removeData/removeData.route';

const router = new Router();

router.use('/problem-support', [Problem]);
router.use('/bank-list', [BankList]);
router.use('/location-default/', [LocationDefaultRouter]);
router.use('/type-code', [Code]);
router.use('/management-user', [UserRouter]);
router.use('/terms-policy', [PolicyRouter]);
router.use('/remove-data', [RemoveDataRouter]);

router.route('/login')
  .post(
    adminValidator.adminLoginValidator,
    adminController.loginAdmin
  );
// User
router.route('/user')
  .get(
    isAdmin.auth(),
    adminController.getUsers
  );

// Get detail info user
router.route('/user/:id')
  .get(
    isAdmin.auth(),
    adminController.getUserById
  );

router.route('/user-refer')
  .get(
    isAdmin.auth(),
    adminController.getReferUsers
  );

router.route('/user-filter')
  .get(
    isAdmin.auth(),
    adminController.getFilterUsers
  );

router.route('/user-export-xlx-list')
  .get(
    isAdmin.auth(),
    adminController.exportUserXlsByAdmin
  );

// Store

router.route('/store-filter')
  .get(
    isAdmin.auth(),
    adminController.getFilterStores
  );

router.route('/store/:id')
  .get(
    isAdmin.auth(),
    adminController.getStoreByIdAdmin
  );

router.route('/store/get-staffs/:id')
  .get(
    isAdmin.auth(),
    adminController.getStaffsStore
  );

router.route('/change-type-code')
  .put(
    isAdmin.auth(),
    adminController.selectTypeCode
  );

// Slides show
router.route('/slideshow')
  .post(
    isAdmin.auth(),
    adminController.createSlideShow
  );

router.route('/slideshow/:id')
  .put(
    isAdmin.auth(),
    adminController.updateSlideShow
  );

router.route('/slideshow/:id')
  .delete(
    isAdmin.auth(),
    adminController.deleteSlideShow
  );

router.route('/slideshow/:id')
  .get(
    isAdmin.auth(),
    adminController.getInfoSlideShow
  );

router.route('/slideshow')
  .get(
    isAdmin.auth(),
    adminController.getSlideShows
  );

router.route('/slideshow-sort')
  .put(
    isAdmin.auth(),
    adminController.sortSlideByAdmin
  );

// News
router.route('/news/')
  .post(
    isAdmin.auth(),
    adminController.createNewsByAdmin
  );

router.route('/news/:id')
  .delete(
    isAdmin.auth(),
    adminController.deleteNewsByAdmin
  );

router.route('/news/:id')
  .put(
    isAdmin.auth(),
    adminController.updateNewsByAdmin
  );

router.route('/news/special-news/:id')
  .put(
    isAdmin.auth(),
    adminController.chooseSpecialNews
  );

router.route('/news')
  .get(
    isAdmin.auth(),
    adminController.getListNews
  );

router.route('/news/:id')
  .get(
    isAdmin.auth(),
    adminController.getInfoNews
  );

router.route('/news/special-news/news')
  .get(
    isAdmin.auth(),
    adminController.getSpecialNews
  );

router.route('/get-info')
  .get(
    isAdmin.auth(),
    adminController.getInfo
  );

router.route('/user-update-status/:id/:status')
  .put(
    isAdmin.auth(),
    adminController.updateStatusUserById
  );

router.route('/store-update-status/:id/:status')
  .put(
    isAdmin.auth(),
    adminController.updateStatusStoreById
  );

router.route('/link-create')
  .post(
    isAdmin.auth(),
    adminController.createListLinked
  );

router.route('/link-delete/:id')
  .delete(
    isAdmin.auth(),
    adminController.deleteLinkById
  );

router.route('/link-update/:id')
  .put(
    isAdmin.auth(),
    adminController.updateLinkedById
  );

router.route('/link-sort')
  .put(
    isAdmin.auth(),
    adminController.sortListLinkedById
  );

router.route('/link-info/:id')
  .get(
    isAdmin.auth(),
    adminController.getLinkInfoById
  );

router.route('/link-get-list')
  .get(
    isAdmin.auth(),
    adminController.getListLinked
  );

router.route('/update-avatar')
  .post(
    isAdmin.auth(),
    adminController.updateAvatarAdmin
  );

export default router;
