import { Router } from 'express';

import { CreateCarController } from '@/modules/cars/useCases/createCar/CreateCarController';

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

export { carsRouter };
