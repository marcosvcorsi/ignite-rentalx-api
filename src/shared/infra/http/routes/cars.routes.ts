import { Router } from 'express';

import { CreateCarController } from '@/modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@/modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin';

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);

const listAvailableCarsController = new ListAvailableCarsController();

carsRouter.get('/available', listAvailableCarsController.handle);

export { carsRouter };
