/**
 * Run the scripts to create initial data
 * @returns {Promise<boolean>}
 */


import bcrypt from 'bcryptjs';
import logger from '../../server/api/logger';
import User from '../../server/components/user/user.model';
import Admin from '../../server/components/admin/admin.model';
import Country from '../../server/components/country/country.model';
import State from '../../server/components/state/state.model';
import Code from '../../server/components/user/code.model';
import { BCRYPT_SALT_ROUNDS } from '../../server/constants';
import Data from '../../external/stage.json';
import { countSettingGeneralDAO, createSettingGeneralDAO, findSettingGeneralDAO } from '../../server/components/admin/settingGeneral/settingGeneral.dao';
import { SETTINGS_GENERAL_USER } from '../../external/constants/constants';

async function createDummyUser() {
  try {
    const numSetting = await countSettingGeneralDAO({ type: SETTINGS_GENERAL_USER.STATUS_CHANGE_CODE_FREE });
    if (!numSetting) {
      await createSettingGeneralDAO({
        type: SETTINGS_GENERAL_USER.STATUS_CHANGE_CODE_FREE,
        data: {
          message: 'Vetop cho đổi mã miễn phí đến ngày 01/05/2021, với giá trị mã tối đa ',
          value: 500000
        }
      })
    }
    const numCode = await Code.countDocuments();
    if (!numCode) {
      const codeValue = [
        { type: 1, code: 1 },
        { type: 2, code: 10 },
        { type: 3, code: 100 },
        { type: 4, code: 1000 },
        { type: 5, code: 10000 },
        { type: 6, code: 100000 },
        { type: 7, code: 1000000 },
        { type: 8, code: 10000000 },
        { type: 9, code: 100000000 },
        { type: 10, code: 1000000000 },
        { type: 11, code: 10000000000 },
        { type: 12, code: 100000000000 },
        { type: 13, code: 1000000000000 },
        { type: 14, code: 10000000000000 },
        { type: 15, code: 100000000000000, status: true },
        { type: 16, code: 1000000000000000 }
      ];
      await Code.insertMany(codeValue);
    }
    const numCount = await Country.countDocuments();
    if (!numCount) {
      const newCountry = await Country.create({
        name: 'VietNam',
        ISO2: 'VN',
        ISO3: 'VNM',
        currencyCode: 'VND'
      });
      const dataStates = [
        {
          id: 1,
          name: 'Thành phố Hà Nội',
          location: '21.0277644-105.8341598',
          type: 'Thành phố Trung ương'
        },
        {
          id: 2,
          name: 'Tỉnh Hà Giang',
          location: '22.7662056-104.9388853',
          type: 'Tỉnh'
        },
        {
          id: 4,
          name: 'Tỉnh Cao Bằng',
          location: '22.635689-106.2522143',
          type: 'Tỉnh'
        },
        {
          id: 6,
          name: 'Tỉnh Bắc Kạn',
          location: '22.3032923-105.876004',
          type: 'Tỉnh'
        },
        {
          id: 8,
          name: 'Tỉnh Tuyên Quang',
          location: '22.1726708-105.3131185',
          type: 'Tỉnh'
        },
        {
          id: 10,
          name: 'Tỉnh Lào Cai',
          location: '22.3380865-104.1487055',
          type: 'Tỉnh'
        },
        {
          id: 11,
          name: 'Tỉnh Điện Biên',
          location: '21.8042309-103.1076525',
          type: 'Tỉnh'
        },
        {
          id: 12,
          name: 'Tỉnh Lai Châu',
          location: '22.3686613-103.3119085',
          type: 'Tỉnh'
        },
        {
          id: 14,
          name: 'Tỉnh Sơn La',
          location: '21.1022284-103.7289167',
          type: 'Tỉnh'
        },
        {
          id: 15,
          name: 'Tỉnh Yên Bái',
          location: '21.6837923-104.4551361',
          type: 'Tỉnh'
        },
        {
          id: 17,
          name: 'Tỉnh Hoà Bình',
          location: '20.6861265-105.3131185',
          type: 'Tỉnh'
        },
        {
          id: 19,
          name: 'Tỉnh Thái Nguyên',
          location: '21.5613771-105.876004',
          type: 'Tỉnh'
        },
        {
          id: 20,
          name: 'Tỉnh Lạng Sơn',
          location: '21.8563705-106.6291304',
          type: 'Tỉnh'
        },
        {
          id: 22,
          name: 'Tỉnh Quảng Ninh',
          location: '21.006382-107.2925144',
          type: 'Tỉnh'
        },
        {
          id: 24,
          name: 'Tỉnh Bắc Giang',
          location: '21.3014947-106.6291304',
          type: 'Tỉnh'
        },
        {
          id: 25,
          name: 'Tỉnh Phú Thọ',
          location: '21.268443-105.2045573',
          type: 'Tỉnh'
        },
        {
          id: 26,
          name: 'Tỉnh Vĩnh Phúc',
          location: '21.3608805-105.5474373',
          type: 'Tỉnh'
        },
        {
          id: 27,
          name: 'Tỉnh Bắc Ninh',
          location: '21.121444-106.1110501',
          type: 'Tỉnh'
        },
        {
          id: 30,
          name: 'Tỉnh Hải Dương',
          location: '20.9385958-106.3206861',
          type: 'Tỉnh'
        },
        {
          id: 31,
          name: 'Thành phố Hải Phòng',
          location: '20.8449115-106.6880841',
          type: 'Thành phố Trung ương'
        },
        {
          id: 33,
          name: 'Tỉnh Hưng Yên',
          location: '20.8525711-106.0169971',
          type: 'Tỉnh'
        },
        {
          id: 34,
          name: 'Tỉnh Thái Bình',
          location: '20.5386936-106.3934777',
          type: 'Tỉnh'
        },
        {
          id: 35,
          name: 'Tỉnh Hà Nam',
          location: '20.5835196-105.92299',
          type: 'Tỉnh'
        },
        {
          id: 36,
          name: 'Tỉnh Nam Định',
          location: '20.2791804-106.2051484',
          type: 'Tỉnh'
        },
        {
          id: 37,
          name: 'Tỉnh Ninh Bình',
          location: '20.2129969-105.92299',
          type: 'Tỉnh'
        },
        {
          id: 38,
          name: 'Tỉnh Thanh Hóa',
          location: '20.1291279-105.3131185',
          type: 'Tỉnh'
        },
        {
          id: 40,
          name: 'Tỉnh Nghệ An',
          location: '19.2342489-104.9200365',
          type: 'Tỉnh'
        },
        {
          id: 42,
          name: 'Tỉnh Hà Tĩnh',
          location: '18.2943776-105.6745247',
          type: 'Tỉnh'
        },
        {
          id: 44,
          name: 'Tỉnh Quảng Bình',
          location: '17.6102715-106.3487474',
          type: 'Tỉnh'
        },
        {
          id: 45,
          name: 'Tỉnh Quảng Trị',
          location: '16.7943472-106.963409',
          type: 'Tỉnh'
        },
        {
          id: 46,
          name: 'Tỉnh Thừa Thiên Huế',
          location: '16.467397-107.5905326',
          type: 'Tỉnh'
        },
        {
          id: 48,
          name: 'Thành phố Đà Nẵng',
          location: '16.0544068-108.2021667',
          type: 'Thành phố Trung ương'
        },
        {
          id: 49,
          name: 'Tỉnh Quảng Nam',
          location: '15.5393538-108.019102',
          type: 'Tỉnh'
        },
        {
          id: 51,
          name: 'Tỉnh Quảng Ngãi',
          location: '15.0759838-108.7125791',
          type: 'Tỉnh'
        },
        {
          id: 52,
          name: 'Tỉnh Bình Định',
          location: '14.1665324-108.902683',
          type: 'Tỉnh'
        },
        {
          id: 54,
          name: 'Tỉnh Phú Yên',
          location: '13.0881861-109.0928764',
          type: 'Tỉnh'
        },
        {
          id: 56,
          name: 'Tỉnh Khánh Hòa',
          location: '12.2585098-109.0526076',
          type: 'Tỉnh'
        },
        {
          id: 58,
          name: 'Tỉnh Ninh Thuận',
          location: '11.6738767-108.8629572',
          type: 'Tỉnh'
        },
        {
          id: 60,
          name: 'Tỉnh Bình Thuận',
          location: '11.0903703-108.0720781',
          type: 'Tỉnh'
        },
        {
          id: 62,
          name: 'Tỉnh Kon Tum',
          location: '14.661167-107.83885',
          type: 'Tỉnh'
        },
        {
          id: 64,
          name: 'Tỉnh Gia Lai',
          location: '13.8078943-108.109375',
          type: 'Tỉnh'
        },
        {
          id: 66,
          name: 'Tỉnh Đắk Lắk',
          location: '12.7100116-108.2377519',
          type: 'Tỉnh'
        },
        {
          id: 67,
          name: 'Tỉnh Đắk Nông',
          location: '12.2646476-107.609806',
          type: 'Tỉnh'
        },
        {
          id: 68,
          name: 'Tỉnh Lâm Đồng',
          location: '11.5752791-108.1428669',
          type: 'Tỉnh'
        },
        {
          id: 70,
          name: 'Tỉnh Bình Phước',
          location: '11.7511894-106.7234639',
          type: 'Tỉnh'
        },
        {
          id: 72,
          name: 'Tỉnh Tây Ninh',
          location: '11.3494766-106.0640179',
          type: 'Tỉnh'
        },
        {
          id: 74,
          name: 'Tỉnh Bình Dương',
          location: '11.3254024-106.477017',
          type: 'Tỉnh'
        },
        {
          id: 75,
          name: 'Tỉnh Đồng Nai',
          location: '11.0686305-107.1675976',
          type: 'Tỉnh'
        },
        {
          id: 77,
          name: 'Tỉnh Bà Rịa - Vũng Tàu',
          location: '10.5417397-107.2429976',
          type: 'Tỉnh'
        },
        {
          id: 79,
          name: 'Thành phố Hồ Chí Minh',
          location: '10.8230989-106.6296638',
          type: 'Thành phố Trung ương'
        },
        {
          id: 80,
          name: 'Tỉnh Long An',
          location: '10.695572-106.2431205',
          type: 'Tỉnh'
        },
        {
          id: 82,
          name: 'Tỉnh Tiền Giang',
          location: '10.4493324-106.3420504',
          type: 'Tỉnh'
        },
        {
          id: 83,
          name: 'Tỉnh Bến Tre',
          location: '10.1081553-106.4405872',
          type: 'Tỉnh'
        },
        {
          id: 84,
          name: 'Tỉnh Trà Vinh',
          location: '9.812741-106.2992912',
          type: 'Tỉnh'
        },
        {
          id: 86,
          name: 'Tỉnh Vĩnh Long',
          location: '10.0861281-106.0169971',
          type: 'Tỉnh'
        },
        {
          id: 87,
          name: 'Tỉnh Đồng Tháp',
          location: '10.4937989-105.6881788',
          type: 'Tỉnh'
        },
        {
          id: 89,
          name: 'Tỉnh An Giang',
          location: '10.5215836-105.1258955',
          type: 'Tỉnh'
        },
        {
          id: 91,
          name: 'Tỉnh Kiên Giang',
          location: '9.8249587-105.1258955',
          type: 'Tỉnh'
        },
        {
          id: 92,
          name: 'Thành phố Cần Thơ',
          location: '10.0451618-105.7468535',
          type: 'Thành phố Trung ương'
        },
        {
          id: 93,
          name: 'Tỉnh Hậu Giang',
          location: '9.757898-105.6412527',
          type: 'Tỉnh'
        },
        {
          id: 94,
          name: 'Tỉnh Sóc Trăng',
          location: '9.6003688-105.9599539',
          type: 'Tỉnh'
        },
        {
          id: 95,
          name: 'Tỉnh Bạc Liêu',
          location: '9.2515555-105.5136472',
          type: 'Tỉnh'
        },
        {
          id: 96,
          name: 'Tỉnh Cà Mau',
          location: '8.9624099-105.1258955',
          type: 'Tỉnh'
        }
      ];
      const promiseState = dataStates.map(async (c) => {
        const rs = await State.create({
          name: c.name,
          IOS2: 'VN',
          IOS3: 'VNM',
          countryId: newCountry._id,
          status: true
        });
        return rs;
      });
      await Promise.all(promiseState);
    }
    const numAdmin = await Admin.countDocuments();
    if (!numAdmin) {
      await Admin.create({
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin111', BCRYPT_SALT_ROUNDS),
        fullName: 'Nguyen Van Min',
        userName: 'admin111'
      });
    }
    const numUser = await User.countDocuments();
    if (!numUser) {
      await User.create({
        code: 'vetop',
        phone: '0123456789',
        fullName: 'Exam Ple',
        password: bcrypt.hashSync('example111', BCRYPT_SALT_ROUNDS),
        email: 'example@gmail.com',
        address: '120/86/113 Thích Quảng Đức, phường 5, quận Phú Nhuận, TPHCM',
        refer: '5f769e48a2ac2708288b3167',
      });
    }
    return true;
  } catch (error) {
    logger.error('dummySomeData error:');
    logger.error(error);
    throw error;
  }
}

export default async function dummySomeData() {
  try {
    // Todo: run your scripts to create dummy data
    await createDummyUser();
    logger.info('dummySomeData done');
    return true;
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    throw error;
  }
}
