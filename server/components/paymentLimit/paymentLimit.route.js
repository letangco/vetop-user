import { Router } from 'express';
import { isStore, isOwnerStore } from '../../../internal/auth/jwt';
import * as PaymentLimitController from './paymentLimit.controller';

const router = new Router();

router.route('')
  .post(
      isOwnerStore.auth(),
      PaymentLimitController.addPaymentLimit
  )

export default router;
