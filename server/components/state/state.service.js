import Zone from './state.model';
import logger from '../../api/logger';

import { error500, errorMessage } from '../../../external/util/error';
import {
  ERROR_CODE
} from '../../../external/constants/constants';
import { deleteState } from './state.controller';
import districtModel from './district.model';

export async function getZones(options) {
  try {
    const conditions = {};
    if (options.countryId) {
      conditions.countryId = options.countryId;
    }
    if (options.keyword) {
      conditions.name = { $regex: options.keyword, $options: 'i' };
    }
    const results = await Promise.all([
      Zone.countDocuments(conditions),
      Zone.find(conditions).sort({ name: 1 }).limit(options.limit).skip(options.skip)
        .lean()
    ]);
    return [results[0], results[1]];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getZone(id) {
  try {
    const zone = await Zone.findById(id).lean();
    if (!zone) return errorMessage(404, ERROR_CODE.ZONE_NOT_FOUND);
    return zone;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getDistrictByIdState(id, query) {
  try {
    const state = await Zone.findById(id);
    if (!state) return errorMessage(404, ERROR_CODE.ZONE_NOT_FOUND);
    const promise = await Promise.all([districtModel.countDocuments({ stateId: id }), districtModel.find({ stateId: id }).sort({ name: -1 }).skip(query.skip).limit(query.limit)]);
    return [promise[0], promise[1]];
  } catch (error) {
    return error500(error);
  }
}

export async function deleteMany() {
  try {
    return await Zone.deleteMany();
  } catch (error) {
    return error500(error)
  }
}

export async function deleteManyDistrict() {
  try {
    return await districtModel.deleteMany();
  } catch (error) {
    return error500(error);
  }
}
