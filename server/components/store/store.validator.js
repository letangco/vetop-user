import { body } from 'express-validator';
import validatorErrorHandler from '../../api/validatorErrorHandler';
import { ERROR_CODE } from '../../../external/constants/constants';

export const createStoreValidator = [
  body('name').notEmpty().withMessage(ERROR_CODE.NAME_INVALID),
  body('description').notEmpty().withMessage(ERROR_CODE.DESCRIPTION_INVALID),
  body('address').notEmpty().withMessage(ERROR_CODE.ADDRESS_INVALID),
  body('phone').isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
  body('countryId').notEmpty().withMessage(ERROR_CODE.COUNTRY_INVALID),
  body('stateId').notEmpty().withMessage(ERROR_CODE.ZONE_INVALID),
  body('loc').notEmpty().withMessage(ERROR_CODE.LOC_INVALID),
  body('categories').isArray().notEmpty().withMessage(ERROR_CODE.CATEGORY_INVALID),
  validatorErrorHandler,
];

export const createStoreLocationValidator = [
  body('name').notEmpty().withMessage(ERROR_CODE.NAME_INVALID),
  body('address').notEmpty().withMessage(ERROR_CODE.ADDRESS_INVALID),
  body('phone').isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
  body('countryId').notEmpty().withMessage(ERROR_CODE.COUNTRY_INVALID),
  body('stateId').notEmpty().withMessage(ERROR_CODE.ZONE_INVALID),
  body('lng').notEmpty().withMessage(ERROR_CODE.LOC_INVALID),
  body('lat').notEmpty().withMessage(ERROR_CODE.LOC_INVALID),
  validatorErrorHandler,
];

export const updateStoreValidator = [
  body('phone')
    .if(body('phone').notEmpty())
    .isMobilePhone().withMessage(ERROR_CODE.PHONE_INVALID),
  validatorErrorHandler,
]

export const updateAvatar = [
  body('avatar').notEmpty().withMessage(ERROR_CODE.AVATAR_IS_NOT_EMPTY),
  validatorErrorHandler
]
