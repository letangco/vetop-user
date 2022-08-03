import { Router } from 'express';
import * as CountryController from './country.controller';

const router = new Router();
router.route('/:id')
  .get(
    CountryController.getCountry
  );
router.route('/')
  .get(
    CountryController.getCountries
  );
export default router;
