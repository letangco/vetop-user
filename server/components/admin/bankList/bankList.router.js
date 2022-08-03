import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as BankListAdmin from './bankList.controller';

const router = new Router();

router.route('/')
    .post(
        isAdmin.auth(),
        BankListAdmin.addBankList
    )
    .put(
        isAdmin.auth(),
        BankListAdmin.updateBankList
    )
    .get(
        isAdmin.auth(),
        BankListAdmin.getBankList
    )

router.route('/:id')
    .delete(
        BankListAdmin.removeBankList
    )
export default router;
