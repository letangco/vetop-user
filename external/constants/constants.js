// This file constants global

export const LIMIT = 10;
export const ADMIN_MIN_PASSWORD_LENGTH = 6;

export const TIME_ONE_DAY = 24 * 60 * 60 * 1000;
export const LANGUAGE_DEFAULT = 'vi';
export const LANG_VI = 'vi';
export const LANG_EN = 'en';
export const START_CODE = 99999999999999;
export const START_CODE_STRING = '00000000000000';
export const REDIS_TIME = 600;
export const API_KEY_ESMS = 'BA26A4FCBF539478CC63D8316985C0';
export const SECRET_KEY_ESMS = '3D51702862118F25B735919326A034';
export const DEBUG = true;
export const CLASS_ACTION = {
  CREATE: 'create',
  APPROVE: 'approve',
  REJECT: 'reject',
};

export const TYPE_PAYMENT_ORDER = {
  E_WALLET: 'e_wallet',
  VN_PAY: 'vnpay'
};

export const PAYMENT_TYPE = {
  DEPOSIT: 1, // User deposit vnd to system
  WITHDRAWAL_PIN: 2, // User withdrawal pin to bank
  WITHDRAWAL_VND: 3, // User withdrawal vnd to bank
  TRANSFER_INTEREST_PIN: 4, // Archive transfer pin interest to user
  TRANSFER_VETIC_BUY: 5, // System transfer vetic to buyer
  TRANSFER_VETIC_SELL: 6, // System transfer vetic to seller
  TRANSFER_VETIC_REF_BUY: 7, // System transfer vetic to refer buyer
  TRANSFER_VETIC_REF_SELL: 8, // System transfer vetic to ref seller
  TRANSFER_MONEY_SYSTEM: 9, // System transfer vnd to system vetop (% vetop receive to maintenance system)
  TRANSFER_MONEY_ARCHIVE: 10, // System transfer vnd to archive wallet
  TRANSFER_PIN: 11, // User transfer pin to vnd
  TOPUP: 12, // Admin topup vnd to user
  INCOME_TAX: 13, // Transaction income tax of user,
  TRANSFER_VETIC_FROM_PIN_RETURN: 14, // transfer vetic from pin return
  STOCK_VND: 15, // Payment order,
  WITHDRAWAL_VND_USER: 16, // - vnd
  WITHDRAWAL_PIN_USER: 17, // - pin
  TRANSFER_PIN_USER: 18, // - pin, pin -> vnd,
  REFUND_WITHDRAWAL_PIN: 19, // refund pin,
  REFUND_WITHDRAWAL_VND: 20, // refund vnd
  TRANSFER_PIN_RECEIVED_VND: 21,
  RESET_INCOME_TAX: 22,
  TRANSFER_VETIC_TO_SIM: 23,
  TRANSFER_VETIC_TO_STOCK: 24,
  FLUCTUATION_VETIC: 25, //
  CHANGE_CODE_USER: 26,
  PIN_GREATER_THAN_VETIC: 27, // check total pin greater than total vetic,
  TRANSFER_VETIC_TOTAL: 28 // total wallet transfer vetic to sell
};
export const WITHDRAWAL_TYPE = {
  WITHDRAWAL_PIN: 1, // User withdrawal pin to bank
  WITHDRAWAL_VND: 2, // User withdrawal vnd to bank
  WITHDRAWAL_PIN_TO_VND: 3, // User withdrawal pin to VND
};
export const CURRENCY_TYPE = {
  VND: 1,
  VETIC: 2,
  PIN: 3,
  STOCK: 4,
};

export const PAYMENT_LIST_TYPE = {
  TRANSFER: 'transfer',
  E_WALLET: 'e_wallet'
};

export const TRANSACTION_CODE = {
  VND: 'VT',
  VETIC: 'VV',
  PIN: 'VP',
  STOCK: 'VS',
};

export const EXPIRE_SIM_OTP = 900; // 15min

export const REDIS_SIM = {
  WALLET: 'wallet'
};

export const USER_TYPE = {
  USER: 1,
  STORE: 2,
  BUY: 2, // Refer user buyer
  SELL: 2 // Refer user seller
};

export const WALLET_TYPE = {
  USER: 1,
  STORE: 2,
  ARCHIVE: 3,
  TOTAL: 4,
  SIM: 5
};
export const WALLET_ARCHIVE_STATUS = {
  STATUS1: 1, // Refund 0.1%
  STATUS2: 2, // Refund 0.05%
  STATUS3: 3 // Pending refund
};
export const CITY_VN = [
  'Cần Thơ',
  'Đà Nẵng',
  'Hải Phòng',
  'Hà Nội',
  'TP HCM',
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bạc Liêu',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Tĩnh',
  'Hải Dương',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lâm Đồng',
  'Lạng Sơn',
  'Lào Cai',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái',
  'Phú Yên',
];

export const LEVEL = [
  'Lớp 1',
  'Lớp 2',
  'Lớp 3',
  'Lớp 4',
  'Lớp 5',
  'Lớp 6',
  'Lớp 7',
  'Lớp 8',
  'Lớp 9',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12',
  'Luyện thi đại học',
  'Luyện tiếng anh',
];

export const SUBJECTS = [
  'Toán',
  'Văn',
  'Lý',
  'Hóa',
  'Sinh',
  'Anh văn',
  'Tin Học'
];
export const TAX_VALUE = 300000;
export const ERROR_CODE = {
  CAN_NOT_DELETE: 'CAN_NOT_DELETE',
  NAME_TYPE_PAYMENT_ORDER_INVALID: 'NAME_TYPE_PAYMENT_ORDER_INVALID',
  TYPE_PAYMENT_ORDER_INVALID: 'TYPE_PAYMENT_ORDER_INVALID',
  PAYMENT_NOT_FOUND: 'PAYMENT_NOT_FOUND',
  CHECKSUM_PAYMENT_INVALID: 'CHECKSUM_PAYMENT_INVALID',
  ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
  ACTION_NOT_FOUND: 'ACTION_NOT_FOUND',
  SCOPE_NOT_FOUND: 'SCOPE_NOT_FOUND',
  ROLE_IS_DUPLICATE: 'ROLE_IS_DUPLICATE',
  ROLE_NAME_EXISTS: 'ROLE_NAME_EXISTS',
  STAFF_NOT_FOUND: 'STAFF_NOT_FOUND',
  STAFF_IS_BLOCKED: 'STAFF_IS_BLOCKED',
  CLASS_IS_WAIT_START: 'CLASS_IS_WAIT_START',
  BALANCE_NOT_ENOUGH: 'BALANCE_NOT_ENOUGH',
  REQUEST_IDS_INVALID: 'REQUEST_IDS_INVALID',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  CLASS_IS_PENDING: 'CLASS_IS_PENDING',
  SUBJECT_INVALID: 'SUBJECT_INVALID',
  TOPIC_INVALID: 'TOPIC_INVALID',
  CITY_NOT_FOUND: 'CITY_NOT_FOUND',
  CLASS_NOT_FOUND: 'CLASS_NOT_FOUND',
  CLASS_FINISHED: 'CLASS_FINISHED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SET_ROLE_BEFORE_ACTIVE: 'SET_ROLE_BEFORE_ACTIVE',
  GROUP_CHAT_NOT_FOUND: 'GROUP_CHAT_NOT_FOUND',
  MESSAGE_NOT_FOUND: 'MESSAGE_NOT_FOUND',
  NOT_EXIST_IN_GROUP_CHAT: 'NOT_EXIST_IN_GROUP_CHAT',
  YOU_HIDE_ONLY_ME: 'YOU_HIDE_ONLY_ME',
  NOT_FOUND_ERR: 'NOT_FOUND_ERR',
  STORE_NOT_FOUND: 'STORE_NOT_FOUND',
  STORE_PENDING_OR_INACTIVE: 'STORE_PENDING_OR_INACTIVE',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  EXISTS: 'VALUES_EXISTS',
  STATUS_INVALID: 'INVALID_STATUS',
  PHONE_PASSWORD_INVALID_ERR: 'PHONE_OR_PASSWORD_INVALID',
  VERIFY_FAIL: 'VERIFY_FAIL',
  PASSWORD_INVAILID: 'PASSWORD_INVAILID',
  INVALID_TYPE_OF_TEACHER: 'INVALID_TYPE_OF_TEACHER',
  PHONE_INVALID: 'PHONE_INVALID',
  PHONE_REGISTERED: 'PHONE_EXISTS',
  ADDRESS_NOT_FOUND: 'ADDRESS_NOT_FOUND',
  INVALID_TYPE_LOGIN: 'INVALID_TYPE_LOGIN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  HAS_BEEN_CANCEL: 'HAS_BEEN_CANCEL',
  REFER_NOT_FOUND: 'REFER_NOT_FOUND',
  NAME_INVALID: 'NAME_INVALID',
  DESCRIPTION_INVALID: 'DESCRIPTION_INVALID',
  ADDRESS_INVALID: 'ADDRESS_INVALID',
  TELEPHONE_INVALID: 'TELEPHONE_INVALID',
  COUNTRY_INVALID: 'COUNTRY_INVALID',
  COUNTRY_NOT_FOUND: 'COUNTRY_NOT_FOUND',
  ZONE_INVALID: 'ZONE_INVALID',
  ZONE_NOT_FOUND: 'ZONE_NOT_FOUND',
  DISTRICT_INVALID: 'DISTRICT_INVALID',
  COMPANY_INVALID: 'COMPANY_INVALID',
  LOC_INVALID: 'LOC_INVALID',
  STAFF_EXISTS: 'STAFF_EXISTS',
  CODE_NOT_FOUND: 'CODE_NOT_FOUND',
  TIME_OUT_INVALID: 'TIME_OUT_INVALID',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  PASSWORD_INVALID_LENGTH: 'PASSWORD_INVALID_LENGTH',
  CODE_EXISTS: 'CODE_EXISTS',
  MODEL_EXISTS: 'MODEL_EXISTS',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
  RANGE_TIME_NOT_FULL: 'RANGE_TIME_NOT_FULL',
  STORE_IS_EXIST: 'STORE_IS_EXIST',
  ORDER_TYPE_INCORRECT: 'ORDER_TYPE_INCORRECT',
  DISCOUNT_IS_GREATER_THAN_TOTAL: 'DISCOUNT_IS_GREATER_THAN_TOTAL',
  INVOICE_EXISTS: 'INVOICE_EXISTS',
  SLIDE_SHOW_NOT_FOUND: 'SLIDE_SHOW_NOT_FOUND',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  INVITE_NOT_FOUND: 'INVITE_NOT_FOUND',
  TYPE_VETIC_INCORRECT: 'TYPE_VETIC_INCORRECT',
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  WALLET_NOT_ENOUGH_PIN: 'WALLET_NOT_ENOUGH_PIN',
  WALLET_NOT_ENOUGH_VND: 'WALLET_NOT_ENOUGH_VND',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  TRANSACTION_NOT_FOUND: 'TRANSACTION_NOT_FOUND',
  TYPE_UPDATE_POLICY_INVALID: 'TYPE_UPDATE_POLICY_INVALID',
  PASSWORD_INVALID: 'PASSWORD_INVALID',
  PRODUCT_VETIC_NOT_EMPTY: 'PRODUCT_VETIC_NOT_EMPTY',
  PRODUCT_NAME_NOT_EMPTY: 'PRODUCT_NAME_NOT_EMPTY',
  PRODUCT_PRICE_NOT_EMPTY: 'PRODUCT_PRICE_NOT_EMPTY',
  PRODUCT_CATEGORIES_NOT_EMPTY: 'PRODUCT_CATEGORIES_NOT_EMPTY',
  PRODUCT_CATEGORIES_IS_AN_ARRAY: 'PRODUCT_CATEGORIES_IS_AN_ARRAY',
  PRODUCT_VETIC_IS_NUMBER: 'PRODUCT_VETIC_IS_NUMBER',
  PRODUCT_QUANTITY_IS_NOT_EMPTY: 'PRODUCT_QUANTITY_IS_NOT_EMPTY',
  SPECIAL_PRODUCT_NOT_FOUND: 'SPECIAL_PRODUCT_NOT_FOUND',
  UPDATE_NOT_ACCEPTABLE: 'UPDATE_NOT_ACCEPTABLE',
  DELETE_NOT_ACCEPTABLE: 'DELETE_NOT_ACCEPTABLE',
  TYPE_STATUS_USER_INVALID: 'TYPE_STATUS_USER_INVALID',
  TIME_INVALID: 'TIME_INVALID',
  ORDER_SAVED: 'ORDER_SAVED',
  TYPE_RATING_INVALID: 'TYPE_RATING_INVALID',
  AVATAR_IS_NOT_EMPTY: 'AVATAR_IS_NOT_EMPTY',
  PERCENT_VETIC_IS_NOT_GREATER_THAN_100: 'PERCENT_VETIC_IS_NOT_GREATER_THAN_100',
  VETIC_IS_NOT_GREATER_THAN_TOTAL: 'VETIC_IS_NOT_GREATER_THAN_TOTAL',
  INDEX_INVALID: 'INDEX_INVALID',
  PRICE_PRODUCT_INVALID: 'PRICE_PRODUCT_INVALID',
  STORE_CATEGORIES_NOT_FOUND: 'STORE_CATEGORIES_NOT_FOUND',
  CODE_OF_VETOP: 'CODE_OF_VETOP',
  CHARACTER_VETOP_ERROR: 'CHARACTER_VETOP_ERROR',
  INVALID_TIME_VALUE: 'INVALID_TIME_VALUE',
  VETIC_MUST_BE_NUMBER: 'VETIC_MUST_BE_NUMBER',
  TOTAL_MUST_BE_NUMBER: 'TOTAL_MUST_BE_NUMBER',
  TYPE_VETIC_MUST_BE_NUMBER: 'TYPE_VETIC_MUST_BE_NUMBER',
  CODE_IS_NOT_EMPTY: 'CODE_IS_NOT_EMPTY',
  PERCENT_VETIC_IS_NOT_GREATER_THAN_30: 'PERCENT_VETIC_IS_NOT_GREATER_THAN_30',
  STORE_LOCATION_NOT_FOUND: 'STORE_LOCATION_NOT_FOUND',
  WISHLIST_NOT_FOUND: 'WISHLIST_NOT_FOUND',
  WISHLIST_EXIST: 'WISHLIST_EXIST',
  STATE_NOT_FOUND: 'STATE_NOT_FOUND',
  BANK_INFO_NOT_FOUND: 'BANK_INFO_NOT_FOUND',
  BANK_ID_REQUIRED: 'BANK_ID_REQUIRED',
  TYPE_ACCOUNT_REQUIRED: 'TYPE_ACCOUNT_REQUIRED',
  ACCOUNT_NUMBER_REQUIRED: 'ACCOUNT_NUMBER_REQUIRED',
  OWNER_NAME_REQUIRED: 'OWNER_NAME_REQUIRED',
  BANK_BRANCH_REQUIRED: 'BANK_BRANCH_REQUIRED',
  TYPE_ACCOUNT_BANK_INVALID: 'TYPE_ACCOUNT_BANK_INVALID',
  CREATE_CATEGORY_ERROR: 'CREATE_CATEGORY_ERROR',
  TYPE_UPDATE_CATEGORY_INVALID: 'TYPE_UPDATE_CATEGORY_INVALID',
  LOCATION_DEFAULT_NOT_FOUND: 'LOCATION_DEFAULT_NOT_FOUND',
  TYPE_USER_INVAILID: 'TYPE_USER_INVAILID',
  PAYMENT_TYPE_INVAILID: 'PAYMENT_TYPE_INVAILID',
  WALLET_NOT_ENOUGH_TO_PAY: 'WALLET_NOT_ENOUGH_TO_PAY',
  TRANSACTION_WAS_APPROVED: 'TRANSACTION_WAS_APPROVED',
  TRANSACTION_WAS_REJECTED: 'TRANSACTION_WAS_REJECTED',
  ORDER_WAS_PAYMENT: 'ORDER_WAS_PAYMENT',
  ORDER_WAITING_ADMIN_HANDLE: 'ORDER_WAITING_ADMIN_HANDLE',
  ORDER_NOT_YET_SAVE: 'ORDER_NOT_YET_SAVE',
  VALUE_IS_REQUIRED: 'VALUE_IS_REQUIRED',
  TYPE_IS_REQUIRED: 'TYPE_IS_REQUIRED',
  BLOCK_EXISTS: 'BLOCK_EXISTS',
  BLOCK_NOT_FOUND: 'BLOCK_NOT_FOUND',
  HAS_BLOCK_THIS_USER: 'HAS_BLOCK_THIS_USER',
  YOU_WAS_BLOCKED: 'YOU_WAS_BLOCKED',
  TYPE_REPORT_INVAILID: 'TYPE_REPORT_INVAILID',
  VALUE_IS_MULTIPLE_TEN_THOUGSAND: 'VALUE_IS_MULTIPLE_TEN_THOUGSAND',
  SPECIAL_PRODUCT_EXIST: 'SPECIAL_PRODUCT_EXIST',
  WALLET_PIN_MIN_ONE_THOUGHSAND: 'WALLET_PIN_MIN_ONE_THOUGHSAND',
  WALLET_MONEY_MIN_ONE_THOUGHSAND: 'WALLET_MONEY_MIN_ONE_THOUGHSAND',
  EMAIL_INVALID: 'EMAIL_INVALID',
  MIN_VALUE_WITHDRAWAL: 'MIN_VALUE_WITHDRAWAL',
  TYPE_SETTING_NOT_FOUND: 'TYPE_SETTING_NOT_FOUND',
  MAX_VALUE_IS_NOT_LESS_THAN_MIN_VALUE: 'MAX_VALUE_IS_NOT_LESS_THAN_MIN_VALUE',
  MIN_VALUE_IS_NOT_GREATER_THAN_MAX_VALUE: 'MIN_VALUE_IS_NOT_GREATER_THAN_MAX_VALUE',
  SIM_NOT_FOUND: 'SIM_NOT_FOUND',
  PIN_NOT_ENOUGH: 'PIN_NOT_ENOUGH',
  TYPE_ORDR_NOT_FOUND: 'TYPE_ORDR_NOT_FOUND',
  ACCOUNT_BANNDED: 'ACCOUNT_BANNDED',
  SIM_EXISTS: 'SIM_EXISTS',
  ACCOUNT_REGISTERED: 'ACCOUNT_REGISTERED',
  SIM_MALL_ACCOUNT_NOTFOUND: 'SIM_MALL_ACCOUNT_NOTFOUND',
  VETIC_NOT_ENOUGH: 'VETIC_NOT_ENOUGH',
  NETWORK_NOT_FOUND: 'NETWORK_NOT_FOUND',
  TYPE_PAID_SIM_NOT_FOUND: 'TYPE_PAID_SIM_NOT_FOUND',
  MONEY_NOT_ENOUGH: 'MONEY_NOT_ENOUGH',
  LINK_NOT_EMPTY: 'LINK_NOT_EMPTY',
  NOT_ENOUGH_PAYMENT_LIMIT: 'NOT_ENOUGH_PAYMENT_LIMIT',
  STAFF_REQUEST_EXISTS: 'STAFF_REQUEST_EXISTS',
  STAFF_BLOCKED: 'STAFF_BLOCKED',
  VALUE_EXIST: 'VALUE_EXIST',
  WAIT_PAYMENT_CODE: 'WAIT_PAYMENT_CODE',
  CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF: 'CAN_NOT_CREATE_ORDER_FOR_YOUR_SELF',
  DATE_INVALID: 'DATE_INVALID',
  AMOUNT_TRANSACTION_INVALID: 'AMOUNT_TRANSACTION_INVALID',
  CATEGORY_INVALID: 'CATEGORY_INVALID,'
};

export const SUCCESS_CODE = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD_SUCCESSFULLY',
  DELETE_SUCCESS: 'DELETE_SUCCESSFULLY',
  CHANGE_PHONE_NUMBER_SUCCESS: 'CHANGE_PHONE_NUMBER_SUCCESS',
  UPDATE_SUCCESSFULLY: 'UPDATE_SUCCESSFULLY',
  APPROVE_SUCCESS: 'APPROVE_SUCCESS',
  REJECT_SUCCESS: 'REJECT_SUCCESS',
  CODE_VALID: 'CODE_VALID',
  CODE_EXISTS_ON_LIST: 'CODE_EXISTS_ON_LIST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  UPDATE_CODE_SUCCESS: 'UPDATE_CODE_SUCCESS',
  ACCEPT_STORE_INVITE_SUCCESS: 'ACCEPT_STORE_INVITE_SUCCESS',
  REJECT_STORE_INVITE_SUCCESS: 'REJECT_STORE_INVITE_SUCCESS',
  CONTACT_TO_SUPPOTER: 'CONTACT_TO_SUPPOTER',
  RATING_STAR_MUST_BE_NUMBER: 'RATING_STAR_MUST_BE_NUMBER',
  UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
  FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
  SAVE_WITH_PENDING: 'SAVE_WITH_PENDING',
  SAVE_WITH_PENDING2: 'SAVE_WITH_PENDING2',
  ORDER_WAS_PAYMENT: 'ORDER_WAS_PAYMENT',
  ORDER_NOT_YET_SAVE: 'ORDER_NOT_YET_SAVE',
  UNBLOCK_SUCCESS: 'UNBLOCK_SUCCESS',
  RATING_EXISTS: 'RATING_EXISTS',
  VETIC_NOT_ENOUGH: 'VETIC_NOT_ENOUGH',
  MONEY_NOT_ENOUGH: 'MONEY_NOT_ENOUGH',
  ORDER_MAX: 'ORDER_MAX'
};

export const SETTINGS_GENERAL_USER = {
  BANK_INFO: 1,
  STATUS_CHANGE_CODE_FREE: 2
};

export const MSG_CODE = {
  NOT_FOUND_ERR: 'NOT_FOUND_ERR',
  STORE_NOT_FOUND: 'STORE_NOT_FOUND',
  INVALID_DAY_IN_WEEK: 'INVALID_DAY_IN_WEEK',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  EXISTS: 'EXISTS',
  SEND_OTP_FAIL: 'SEND_OTP_FAIL',
  STATUS_INVALID: 'STATUS_INVALID',
  PHONE_PASSWORD_INVALID_ERR: 'PHONE_PASSWORD_INVALID_ERR',
  ACCOUNT_NOT_VERIFIED_YET: 'ACCOUNT_NOT_VERIFIED_YET',
  ACCOUNT_IS_BANNED: 'ACCOUNT_IS_BANNED',
  VERIFY_FAIL: 'VERIFY_FAIL',
  PASSWORD_INVALID: 'PASSWORD_INVALID',
  INVALID_TYPE_OF_TEACHER: 'INVALID_TYPE_OF_TEACHER',
  PHONE_INVALID: 'PHONE_INVALID',
  PHONE_REGISTERED: 'PHONE_REGISTERED',
  ADDRESS_NOT_FOUND: 'ADDRESS_NOT_FOUND',
  INVALID_TYPE_LOGIN: 'INVALID_TYPE_LOGIN',
  INVALID_TYPE_OF_TRAINING_FORM: 'INVALID_TYPE_OF_TRAINING_FORM',
  VERIFY_PHONE_EXPIRE_DURATION: 'VERIFY_PHONE_EXPIRE_DURATION',
  VERIFY_CODE_INCORRECT: 'VERIFY_CODE_INCORRECT',
  ACCOUNT_ACTIVATED: 'ACCOUNT_ACTIVATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  CLASS_NOT_PENDING: 'CLASS_NOT_PENDING',
  TEACHER_HAS_RECEIVED: 'TEACHER_HAS_RECEIVED',
  CLASS_IS_ONGOING: 'CLASS_IS_ONGOING',
  CLASS_IS_EXPIRE_REGISTER: 'CLASS_IS_EXPIRE_REGISTER',
  REQUEST_IS_EXPIRE_REGISTER: 'REQUEST_IS_EXPIRE_REGISTER',
  CLASS_IS_FULL: 'CLASS_IS_FULL',
  HAS_BEEN_CANCEL: 'HAS_BEEN_CANCEL',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  REFER_NOT_FOUND: 'REFER_NOT_FOUND',
  NAME_INVALID: 'NAME_INVALID',
  DESCRIPTION_INVALID: 'DESCRIPTION_INVALID',
  ADDRESS_INVALID: 'ADDRESS_INVALID',
  TELEPHONE_INVALID: 'TELEPHONE_INVALID',
  COUNTRY_INVALID: 'COUNTRY_INVALID',
  ZONE_INVALID: 'ZONE_INVALID',
  DISTRICT_INVALID: 'DISTRICT_INVALID',
  COMPANY_INVALID: 'COMPANY_INVALID',
  LOC_INVALID: 'LOC_INVALID',
  STAFF_EXISTS: 'STAFF_EXISTS',
  CODE_NOT_FOUND: 'CODE_NOT_FOUND',
  TIME_OUT_INVALID: 'TIME_OUT_INVALID',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
  MODEL_EXISTS: 'MODEL_EXISTS',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  CATEGORY_EXISTS_IN_STORE: 'CATEGORY_EXISTS_IN_STORE',
  RATING_STAR_MUST_BE_NUMBER: 'RATING_STAR_MUST_BE_NUMBER',
  NOT_INVITE_SELF: 'NOT_INVITE_SELF'
};

export const SHARE_HOST = 'https://vetop-upload-dev.tesse.io';

export const TYPE_OF_TEACHER = {
  STUDENT: 0,
  TEACHER: 1,
  WORKING: 2
};

export const STATUS_PRODUCT = {
  PENDING: 1,
  ACTIVE: 2,
  DEACTIVE: 3
};

export const DEFAULT_AVATAR_CLASS = {
  name: '5f718f9d3abc89001945b625_default_1602236703381.png',
  large: '5f718f9d3abc89001945b625_default_1602236703381.png',
  medium: '180x180_5f718f9d3abc89001945b625_default_1602236703381.png',
  small: '90x90_5f718f9d3abc89001945b625_default_1602236703381.png'
};

export const TYPE_SIM_CATEGORY = {
  NETWORK: 1,
  FORMAT: 2,
  OTHER: 3
};


export const TYPE_FILTER_SIM = {
  PIN: 1,
  VETIC: 2,
  PRICE: 3,
  TAX: 4
};

export const STATUS_CLASS_REGISTER = {
  PENDING: 'pending',
  APPROVE: 'approve',
  REJECT: 'reject',
  CANCEL: 'cancel'
};

export const STATUS_UPDATE_ORDER = {
  ACCEPT: 'accept',
  REJECT: 'reject'
};

export const TYPE_LOGIN = {
  STORE: 'store',
  USER: 'user',
  STAFF: 'staff'
};

export const DEFAULT_AVATAR = {
  name: '5f718f9d3abc89001945b625_default_1602236703381.png',
  large: '5f718f9d3abc89001945b625_default_1602236703381.png',
  medium: '180x180_5f718f9d3abc89001945b625_default_1602236703381.png',
  small: '90x90_5f718f9d3abc89001945b625_default_1602236703381.png'
};

export const DEFAULT_AVATAR_STORE = {
  name: '5fdc6aafb16bff44230a419c_cuahangdefault_1608880894193.png',
  large: '5fdc6aafb16bff44230a419c_cuahangdefault_1608880894193.png',
  medium: '49x49_5fdc6aafb16bff44230a419c_cuahangdefault_1608880894193.png',
  small: '25x25_5fdc6aafb16bff44230a419c_cuahangdefault_1608880894193.png'
};

export const DEFAULT_GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2
};

export const DEFAULT_IMAGE_PRODUCT = {
  name: '5fe5a8c3d9fefb67bef8726e_defaultproduct_1609134731396.jpg',
  large: '5fe5a8c3d9fefb67bef8726e_defaultproduct_1609134731396.jpg',
  medium: '500x500_5fe5a8c3d9fefb67bef8726e_defaultproduct_1609134731396.jpg',
  small: '250x250_5fe5a8c3d9fefb67bef8726e_defaultproduct_1609134731396.jpg'
};

export const DEFAULT_VALUE_CODE = 50000;


export const ORDER_TYPE = {
  ONLINE: 1,
  OFFLINE: 2
};

export const STATUS_ORDER = {
  PENDING: -1,
  DRAFT: 0,
  MAIN: 1,
  WAITING_ADMIN: 2, // waiting admin approve,
  REJECT: 3,
  TEMP: 4
};

export const TYPE_SPECIAL = {
  PERCENT: 1,
  NUMBER: 2
};

export const STATUS_WITHDRAWL = {
  PENDING: 0,
  APPROVE: 1,
  REJECT: 2,
  DOING: 3
};

export const STATUS_PAYMENT_PAYME = {
  PENDING: 0,
  APPROVE: 1,
  REJECT: 2
};

export const LIST_SCOPES = {
  STAFF: 'staff',
  ROLE: 'role',
  USER: 'user',
  REVIEW: 'review',
  CLASS: 'class',
  NOTIFICATION: 'notification',
  PAYMENT: 'payment',
  WITHDRAW: 'withdraw',
  TYPE_CLASS: 'type_class',
  TOPIC: 'topic',
  SUBJECT: 'subject',
  TRANSACTION: 'transaction',
};

export const TYPE_SETTING = {
  PIN_FEE_WITHDRAWL: 1,
  VND_FEE_WITHDRAWAL: 2,
  MULTIPLE_NUMBER_VETIC: 3,
  VETIC_REF_BUYER_RECEIVE: 4,
  VETIC_REF_SELLER_RECEIVE: 5,
  MAX_VETIC: 6,
  MAXIMUM_TOKEN_SYSTEM: 7
};

export const STATUS_SELL_SIM = {
  PENDING: 1,
  TRADING_HALT: 2,
  SOLD: 3
};

export const TRANS_STATUS_WITHDRAWAL = {
  PENDING: 'Đang xử lý',
  APPROVE: 'Thành công',
  REJECT: 'Thất bại',
  DOING: 'Đang xem xét'
};

export const LIST_ACTION = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const MESSAGE_CODE_VNPAY = {
  SUCCESS: 'Giao dịch thành công',
  DUPLICATE: 'Giao dịch đã tồn tại',
  MERCHANT_INVALID: 'Merchant không hợp lệ',
  PARAMS_INVALID: 'Dữ liệu gửi sang không đúng định dạng',
  WEB_BLOCKED: 'Khởi tạo GD không thành công do Website đang bị tạm khóa',
  PASSWORD_INVALID: 'Giao dịch không thành công do: Quý khách nhập sai mật khẩu quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
  OTP_INVALID: 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
  TRANSACTION_BLOCK: 'Giao dịch bị nghi ngờ là giao dịch gian lận',
  NOT_INTERNET_BANKING: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
  VERIFY_CARD_FAILED: 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
  TIME_OUT: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
  CARD_BLOCK: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
  ENOUGH_BALANCE: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
  OVERLOAD_LEVEL: 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
  BANK_MAINTENANCE: 'Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì. Xin quý khách tạm thời không thực hiện giao dịch bằng thẻ/tài khoản của Ngân hàng này.',
  OTHER: 'Các lỗi khác'
};

export const TYPE_UPDATE_POLICY = {
  POLICY: 'policy',
  INFO: 'info',
  SUPPORT: 'support',
  INSTRUCTION: 'instruction',
  MODEL: 'model',
  RECOMMENDATION: 'recommendation',
};

export const TYPE_RATING = {
  STORE: 1,
  PRODUCT: 2
};

export const TYPE_ACCOUNT_BANK = {
  USER: 'user',
  STORE: 'store'
};

export const UPDATE_STATUS_CATEGORY = {
  TRUE: true,
  FALSE: false
};

export const REPORT = {
  USER: 1,
  USER_ONL: 2,
  STORE: 3,
  STORE_ONL: 4,
  PIN: 5,
  VETIC: 6,
  ORDER: 7,
  TOKEN: 8,
  REFRESH_SYSTEM: 9, // tổng số lần hệ thống refresh
  SYSTEM_CLOSE_REFUND: 10 // tổng số lần hệ thống ngưng hoàn tiền
};

export const CHAT_REPORT_TYPE = {
  DISTURB: 1,
  SENSITIVE: 2,
  CHEAT: 3,
  ORTHER: 4
};

export const SETTING_TYPE = {
  ORDER: 1,
  PRODUCT: 2,
  TRANSACTION: 3,
  FILTER_SIM_VETIC: 4,
  FILTER_SIM_PRICE: 5,
  TIME_FIRE_WORK: 6,
  STATUS_CHANGE_CODE_FREE: 7,
  BANK_INFO: 8,
  POINT_OVER_ORDER: 9,
  TYPE_RATING: 10
};

export const TYPE_ORDER_SIM_PRODUCT = {
  PRODUCT: 1,
  SIM: 2
};

export const TYPE_PAID_SIM = {
  PREPAID: 1,
  POSTPAID: 2
};

export const STAFF_STATUS = {
  PENDING: 1,
  APPROVE: 2,
  REJECT: 3,
  BLOCK: 4
};

export const PUBLIC_KEY_PAYME = '-----BEGIN PUBLIC KEY-----\n'
+ 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKLdff2ttO/T3PIZevNS4GK3TuLNuFdV\n'
+ 'M4t228ISgzw5d+IfT5VSBUvZh4Iy+o6N0X8VQPapVXmjbgQFaxDoqScCAwEAAQ==\n'
+ '-----END PUBLIC KEY-----';

export const PRIVATE_KEY_PAYME = '-----BEGIN RSA PRIVATE KEY-----\n'
+ 'MIIBOgIBAAJBAIv047qF3KegW0/gyoXUgkogxl5ep6sDa7S1yI7A5cP2VUQnBcdN\n'
+ 'Q4nr+3byN60JAAtwSGqaeB+EqNudB6+HhisCAwEAAQJAJHHu42F8ZkJBxPk6g8Mk\n'
+ '8ny6a1SmwMexQmucAGCG9JJKzQyfCukSesT6cIbzkdrOX3tgmA/Z4fwBVLk1sSJ5\n'
+ 'oQIhAOK1PEVU1cw8EyMUfWL2dw+eq2kpaKjekTRrS9b/eVCJAiEAngozUr1oaiLN\n'
+ 'slm8M8ZYVV/fTU6wPEAc1jOd3fB3LBMCID1Ji3qevZGR6AaCwobfZD53wZUTWbTV\n'
+ 'PmHyY7VCqVQpAiBfyH7inrkx2nYgqhJOrt/KnpiQGijl21We3RnI8XzI0QIhAKF5\n'
+ '8MA+Di8fVKdvT0aHCm1iwwmzNc2gVJYwcwvJYWBM\n'
+ '-----END RSA PRIVATE KEY-----\n';

export const CONNECTION_ID_PAYME = '89186581153';

export const CONNECTION_KEY_PAYME = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDI4MywiYXBwSWQiOiI4OTE4NjU4MTE1MyIsIm1lcmNoYW50SWQiOjg5NjU4LCJhY2NvdW50SWQiOjUzMywidHlwZSI6IkFQUCIsImlhdCI6MTYxNzA4MDI5M30.TZNNWCowA0sTiU32ogW9_AnVjjQNWtZ6LkHYnQBAQ48';
