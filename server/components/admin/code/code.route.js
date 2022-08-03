import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as AdminCodeController from './code.controller';
import * as UserMulter from '../../user/user.multer';

const router = new Router();

router.route('/default/')
  .get(
      isAdmin.auth(),
      AdminCodeController.getTypeCodeDefault
  );

router.route('/search-code')
  .get(
    isAdmin.auth(),
    AdminCodeController.searchCode
  )
  .delete(
    isAdmin.auth(),
    AdminCodeController.deleteSearchCodeAll
  );

router.route('/search-code/:id')
  .delete(
    isAdmin.auth(),
    AdminCodeController.deleteSearchCode
  )
  .get(
    isAdmin.auth(),
    AdminCodeController.getSearchCodeInfo
  );

router.route('/import-code')
  .post(
    isAdmin.auth(),
    UserMulter.userAvatarUploader,
    AdminCodeController.importCode
  );

router.route('/get-codes')
  .get(
    isAdmin.auth(),
    AdminCodeController.getCodes
  );

router.route('/get-code/:id')
  .get(
    isAdmin.auth(),
    AdminCodeController.getCode
  );

router.route('/delete-best-code/:id')
  .delete(
    isAdmin.auth(),
    AdminCodeController.deleteBestCode
  );

router.route('/update-status/:id/:status')
  .put(
    isAdmin.auth(),
    AdminCodeController.updateStatusBestCode
  );

router.route('/update-info-bestCode/:id')
  .put(
    isAdmin.auth(),
    AdminCodeController.updateInfoBestCode
  );

router.route('/get-vip-codes')
  .get(
    isAdmin.auth(),
    AdminCodeController.getVIPCodes
  );

router.route('/get-vip-code/:id')
  .get(
    isAdmin.auth(),
    AdminCodeController.getVIPCode
  );

router.route('/update-value-vip-code/:id')
  .put(
    isAdmin.auth(),
    AdminCodeController.updateValueVIPCode
  );

router.route('/auto-code-generate')
  .get(
    isAdmin.auth(),
    AdminCodeController.showAutoGenerateCode
  );

router.route('/export-temple-file-code')
  .get(
    isAdmin.auth(),
    AdminCodeController.exportTempleFileCode
  );

export default router;
