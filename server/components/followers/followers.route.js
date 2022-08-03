import { Router } from 'express';
import * as FollowersController from './followers.controller';
import { isUser } from '../../../internal/auth/jwt';

const router = new Router();

router.route('/')
  .post(
    isUser.auth(),
    FollowersController.addFollower
  );

router.route('/get-by-user')
  .get(
    isUser.auth(),
    FollowersController.getFollowers
  );

router.route('/get-by-store')
  .get(
    isUser.auth(),
    FollowersController.getFollowersByStore
  );

router.route('/:id')
  .delete(
    isUser.auth(),
    FollowersController.deleteFollower
  );
export default router;
