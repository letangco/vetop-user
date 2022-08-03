import { body, query } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { USER_MIN_PASSWORD_LENGTH } from '../../constants';
import {
  ERROR_CODE
} from '../../../external/constants/constants';

export const userLoginValidator = [
  body('phone').isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
  body('password').isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
    ERROR_CODE.PASSWORD_INVALID_LENGTH,
    [USER_MIN_PASSWORD_LENGTH]
  ]),
  validatorErrorHandler,
];

export const userRegisterValidator = [
  body('phone').isMobilePhone().withMessage(
    ERROR_CODE.PHONE_INVALID
  ),
  body('password')
    .if(body('password').notEmpty())
    .isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
      ERROR_CODE.PASSWORD_INVALID_LENGTH,
      [USER_MIN_PASSWORD_LENGTH]
    ]),
  validatorErrorHandler,
];

export const registerNewAccount = [
  body('phone').isMobilePhone().withMessage(
    ERROR_CODE.PHONE_INVALID
  ),
  body('password').isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
    ERROR_CODE.PASSWORD_INVALID,
    [USER_MIN_PASSWORD_LENGTH]
  ]),
  validatorErrorHandler
]

export const changePasswordValidator = [
  body('newPassword').isLength({ min: USER_MIN_PASSWORD_LENGTH }).withMessage([
    ERROR_CODE.PASSWORD_INVALID,
    [USER_MIN_PASSWORD_LENGTH]
  ]),
  validatorErrorHandler
];

export const CHECK_PHONE_NUMBER = [
  body('phone').isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
  validatorErrorHandler,
];

export const searchCode = [
  query('code').isLength({ min: 3, max: 16 }).withMessage(ERROR_CODE.CODE_LENGTH_ERROR),
  validatorErrorHandler
];
