import Country from './country.model';
import logger from '../../api/logger';

import { error500, errorMessage } from '../../../external/util/error';
import {
  ERROR_CODE
} from '../../../external/constants/constants';

export async function getCountries(options) {
  try {
    const conditions = {};
    if (options.keyword) {
      // filter by name
      conditions.name = { $regex: options.keyword, $options: 'i' };
    }
    const results = await Promise.all([
      Country.countDocuments(conditions),
      Country.find(conditions).sort({ name: 1 }).limit(options.limit).skip(options.skip)
        .lean()
    ]);
    return [results[0], results[1]];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getCountry(id) {
  try {
    const country = await Country.findById(id).lean();
    if (!country) return errorMessage(404, ERROR_CODE.COUNTRY_NOT_FOUND);
    return await Country.findById(id).lean();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}
