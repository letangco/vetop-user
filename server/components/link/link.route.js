import { Router } from 'express';
import * as LinkController from './link.controller';

const router = new Router();


router.route('/get-info/:id')
    .get(
        LinkController.getInfoLink
    );

router.route('/get-list')
    .get(
        LinkController.getListLink
    );

export default router;
