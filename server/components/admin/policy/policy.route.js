/* eslint-disable import/no-cycle */

import { Router } from 'express';
import * as adminPolicyController from './policy.controller';
import { isAdmin } from '../../../../internal/auth/jwt';

const router = new Router();

router.route('/:type')
    .put(
        isAdmin.auth(),
        adminPolicyController.updatePolicyByType
    )
    .get(
        isAdmin.auth(),
        adminPolicyController.getInfoPolicyByAdmin
    );

export default router;
