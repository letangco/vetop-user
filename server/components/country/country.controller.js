import * as CountryService from './country.service';
import { commonGetQuery } from '../../../external/middleware/query';

export async function getCountries(req, res) {
  try {
    const query = commonGetQuery(req);
    return res.RH.paging(await CountryService.getCountries(query), query.page, query.limit);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getCountry(req, res) {
  try {
    return res.RH.success(await CountryService.getCountry(req.params.id));
  } catch (error) {
    return res.RH.error(error);
  }
}
