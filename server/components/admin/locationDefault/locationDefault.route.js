import { Router } from 'express';
import { isAdmin } from '../../../../internal/auth/jwt';
import * as LocationDefaultController from './locationDefault.controller';

const router = new Router();

router.route('/')
  .post(
    //   isAdmin.auth(),
    LocationDefaultController.addLocationDefault
  )
  .get(
      isAdmin.auth(),
    LocationDefaultController.getLocationDefault
  )
  .put(
      isAdmin.auth(),
    LocationDefaultController.updateLocationDefault
  )

router.route('/status/')
  .put(
      isAdmin.auth(),
      LocationDefaultController.changeStatusLocationDefault
  )  

router.route('/:id')
  .delete(
      isAdmin.auth(),
      LocationDefaultController.removeLocationDefault
  )
  .get(
      isAdmin.auth(),
      LocationDefaultController.getLocationDefaultById
  )

export default router;
