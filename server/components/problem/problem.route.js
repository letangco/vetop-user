import { Router } from 'express';
import * as ProblemController from './problem.controller';

const router = new Router();

router.route('/')
    .get(
        ProblemController.getListProblemSupport
    );

router.route('/:id')
    .get(
        ProblemController.getProblemInfo
    );

export default router;
