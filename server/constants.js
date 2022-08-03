/**
 * The global constants
 */
const MEGABYTE = 1024 * 1024;
export const MAX_UPLOAD_FILE_SIZE_MB = 200;
export const MAX_UPLOAD_FILE_SIZE_BYTE = MAX_UPLOAD_FILE_SIZE_MB * MEGABYTE;
export const PRICE_BUY_CODE = 50000;
export const PRICE_BUY_STEP = 50000;
export const BCRYPT_SALT_ROUNDS = 5;
export const VERIFY_EMAIL_EXPIRE_DURATION = '3m';
export const USER_JWT_DEFAULT_EXPIRE_DURATION = '10d';
export const MORGAN_FORMAT = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
export const USER_MIN_PASSWORD_LENGTH = 6;
export const VERIFICATION_CODE_LENGTH = 6;
export const DEFAULT_LANGUAGE = 'vi';

export const USER_ROLES = {
  CUSTOMER: 1, // Importer/ Exporter
  TRUCKING_COMPANY: 2,
  SHIPPING_COMPANY: 3,
};

export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  PENDING: 3,
  WAIT_PAYMENT_CODE: 4
};

export const STORE_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  PENDING: 3,
};

export const GENDER_STATUS = {
  OTHER: 0,
  MALE: 1,
  FEMALE: 2
};
export const DEFAULT_AVATAR = {
  name: '5fe58a8634f3ce5d508af4b2_avatardefault_1608879523519.png',
  large: '5fe58a8634f3ce5d508af4b2_avatardefault_1608879523519.png',
  medium: '65x65_5fe58a8634f3ce5d508af4b2_avatardefault_1608879523519.png',
  small: '33x33_5fe58a8634f3ce5d508af4b2_avatardefault_1608879523519.png'
};

export const DEFAULT_ICON = {
  name: '5fc890ca2baa9445cc23e31a_default_1609145325006.jpg',
  large: '5fc890ca2baa9445cc23e31a_default_1609145325006.jpg',
  medium: '200x200_5fc890ca2baa9445cc23e31a_default_1609145325006.jpg',
  small: '100x100_5fc890ca2baa9445cc23e31a_default_1609145325006.jpg'
};

export const PRODUCT_STATUS = {
  ACTIVE: true,
  DISABLE: false
};

export const DEFAULT_GROUP = {

}

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

// eslint-disable-next-line prefer-const
// eslint-disable-next-line import/no-mutable-exports
export const Zookeeper = {
  port: '',
  dbURI: '',
  secret: '',
  grpc: {
    user: '',
    class: ''
  },
  rabbitmqURI: '',
  redis: {
    host: 'localhost',
    port: 6379,
    pass: '',
  },
  apiDocs: ''
};
