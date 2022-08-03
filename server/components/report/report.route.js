import { Router } from 'express';
import { isUser } from '../../../internal/auth/jwt';
import * as ReportController from './report.controller';

const router = new Router();

router.route('/')
  .post(
      isUser.auth(),
      ReportController.createReport
  )

export default router;
