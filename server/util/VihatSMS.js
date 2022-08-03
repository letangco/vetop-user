import axios from 'axios';
import logger from '../api/logger';
import {
  API_KEY_ESMS, ERROR_CODE, SECRET_KEY_ESMS, DEBUG
} from '../../external/constants/constants';
import { error500 } from '../../external/util/error';

export async function sendSMS(phone, code) {
  try {
    if (DEBUG) return true;
    const msgOtp = await axios.get(
      `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${phone}&Content=${code}&ApiKey=${API_KEY_ESMS}&SecretKey=${SECRET_KEY_ESMS}&SmsType=2&Brandname=Verify&Sandbox=0`);
    if (msgOtp.data?.CodeResult === '100') {
      return true;
    }
    return false;
  } catch (err) {
    logger.log('err sendSMS: ', err);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
