import * as ZoneService from './state.service';
import { commonGetQuery } from '../../../external/middleware/query';
import State from './state.model';
import District from './district.model';
import Data from '../../../external/stage.json';

export async function getZones(req, res) {
  try {
    const query = commonGetQuery(req);
    return res.RH.paging(await ZoneService.getZones(query), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getZone(req, res) {
  try {
    return res.RH.success(await ZoneService.getZone(req.params.id));
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getDistrictByIdState(req, res) {
  try {
    const query = commonGetQuery(req);
    const id = req.params.id;
    const payload = await ZoneService.getDistrictByIdState(id, query);
    return res.RH.paging(payload, query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function dummyState(req, res) {
  try {
    const countDistrict = await District.countDocuments();
    if (countDistrict) {
      return res.RH.success('exists');
    }
    let stateDistrict = Object.values(Data[0]);
    stateDistrict = stateDistrict.map(async (t) => {
      const createState = await State.create(t);
      const createDistrict = Object.values(t['quan-huyen']).map(async (d) => {
        d.stateId = createState._id;
        const newDistrict = await District.create(d);
        return newDistrict;
      });
      await Promise.all(createDistrict);
      return createState;
    });
    await Promise.all(stateDistrict);
    return res.RH.success(true);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteState(req, res) {
  try {
    return res.RH.success(await ZoneService.deleteMany())
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function deleteManyDistrict(req, res) {
  try {
    return res.RH.success(await ZoneService.deleteManyDistrict());
  } catch (error) {
    return res.RH.error(error);
  }
}
