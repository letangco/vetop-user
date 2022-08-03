import { body } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { ERROR_CODE } from '../../../external/constants/constants';

export const createBankInfo = [
  body('bankId').notEmpty().withMessage(ERROR_CODE.BANK_ID_REQUIRED),
  body('accountNumber').notEmpty().withMessage(ERROR_CODE.ACCOUNT_NUMBER_REQUIRED),
  body('ownerName').notEmpty().withMessage(ERROR_CODE.OWNER_NAME_REQUIRED),
  body('bankBranch').notEmpty().withMessage(ERROR_CODE.BANK_BRANCH_REQUIRED),
  validatorErrorHandler,
];
