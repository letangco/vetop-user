import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as ProblemController from './problem.controller';

const router = new Router();

router.route('/')
    .post(
        isAdmin.auth(),
        ProblemController.createProblemSupportByAdmin
    );

router.route('/')
    .get(
        isAdmin.auth(),
        ProblemController.getListProblemSupportByAdmin
    );

router.route('/:id')
    .get(
        isAdmin.auth(),
        ProblemController.getProblemInfoByAdmin
    );

router.route('/:id')
    .put(
        isAdmin.auth(),
        ProblemController.updateProblemByAdmin
    );

router.route('/:id')
    .delete(
        isAdmin.auth(),
        ProblemController.deleteProblemByAdmin
    );

export default router;
