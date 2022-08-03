import { body } from 'express-validator';
import { ADMIN_MIN_PASSWORD_LENGTH, ERROR_CODE } from '../../../external/constants/constants';
import validatorErrorHandle from '../../api/validatorErrorHandler';

export const adminLoginValidator = [
    body('email').isEmail().withMessage(ERROR_CODE.EMAIL_INVALID),
    body('password').isLength({ min: ADMIN_MIN_PASSWORD_LENGTH })
        .withMessage(`Password must be at least ${ADMIN_MIN_PASSWORD_LENGTH} chars long`),
    validatorErrorHandle
];

export const changePasswordAdmin = [
    body('newPassword').isLength({ min: ADMIN_MIN_PASSWORD_LENGTH })
        .withMessage(`Password must be at least ${ADMIN_MIN_PASSWORD_LENGTH} chars long`),
    validatorErrorHandle
];

export const changeProfile = [
    body('email')
        .if(body('email').notEmpty())
        .isEmail().withMessage(ERROR_CODE.EMAIL_INVALID),
    validatorErrorHandle
];

export const CHECK_PHONE_NUMBER = [
    body('newPhone').isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
    validatorErrorHandle,
];
