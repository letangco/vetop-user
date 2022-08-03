import { Router } from 'express';
import * as slideShowController from './slideManagement.controller';

const router = new Router();

router.route('/:id')
    .get(
        slideShowController.getInfoSlideShow
    );

router.route('/')
    .get(
        slideShowController.getSlideShows
    );

export default router;
