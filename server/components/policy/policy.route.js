import { Router } from 'express';
import * as Policy from './policy.controller';

const router = new Router();
router.route('/get-by-user/:type')
  .get(
    Policy.getInfoPolicyByUser
  );

export default router;
