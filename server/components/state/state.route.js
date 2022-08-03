import { Router } from 'express';
import { isAdmin } from '../../../internal/auth/jwt';
import * as ZoneController from './state.controller';

const router = new Router();
router.route('/detail/:id')
  .get(
    ZoneController.getZone
  );
router.route('/')
  .get(
    ZoneController.getZones
  )
  .delete(
    isAdmin.auth(),
    ZoneController.deleteState
  );

router.route('/district/:id')
  .get(
    ZoneController.getDistrictByIdState
  )

router.route('/delete-district')
  .delete(
    isAdmin.auth(),
    ZoneController.deleteManyDistrict
  )

router.route('/dummy-states')
  .get(
    ZoneController.dummyState
  )


export default router;
