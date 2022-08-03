import { Router } from 'express';
import * as SupportController from './support.controller';

const router = new Router();

router.route('/create-support-by-email')
  .post(
    SupportController.createSupportByEmail
  );

export default router;
