import { Router } from 'express';
import { isStore, isUser } from '../../../internal/auth/jwt';
import * as BankListController from './bankInfo.controller';
import * as BankInfoValidator from './bankInfo.validator';

const router = new Router();

router.route('/bank/store/')
  .post(
      isStore.auth(),
      BankInfoValidator.createBankInfo,
      BankListController.addBankInfo
  )
  .get(
    isStore.auth(),
    BankListController.getBankInfos
  )
  .put(
    isStore.auth(),
    BankListController.updateBankInfo
  );

router.route('/bank/user/')
  .post(
    isUser.auth(),
    BankInfoValidator.createBankInfo,
    BankListController.addBankInfoUser
  )
  .get(
    isUser.auth(),
    BankListController.getBankInfoUser
  )
  .put(
    isUser.auth(),
    BankListController.updateBankInfo
  );

router.route('/bank-default/user/status/')
  .put(
    isUser.auth(),
    BankListController.changeBankInfoDefaultUser
  );

router.route('/bank-default/store/status/')
  .put(
    isStore.auth(),
    BankListController.changeBankInfoDefaut
  );
router.route('/bank/store/:id')
  .delete(
    isStore.auth(),
    BankListController.removeBankInfo
  );

router.route('/bank/user/:id')
  .delete(
    isUser.auth(),
    BankListController.removeBankInfo
  );

router.route('/bank-list/')
 .get(
   BankListController.getBankList
 );

export default router;
