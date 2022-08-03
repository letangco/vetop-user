import { Router } from 'express';
import * as RemoveDataController from './removeData.controller';

const router = new Router();

router.route('')
   .delete(
       RemoveDataController.removeData
   )

export default router;
