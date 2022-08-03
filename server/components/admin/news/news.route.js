import { Router } from 'express';
import * as NewsController from './news.controller';
import { isAdmin } from '../../../../internal/auth/jwt';
const router = new Router();

router.route('/:id')
    .get(
        NewsController.getInfoNews
    );

router.route('/')
    .get(
        NewsController.getListNews
    );

router.route('/special-news/news')
    .get(
        NewsController.getSpecialNews
    );

router.route('/filter-related-news/:id')
    .get(
        NewsController.filterRelatedNews
    );

export default router;
