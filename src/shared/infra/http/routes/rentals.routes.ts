import { Router } from 'express';

import { CreateRentalController } from '@/modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@/modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@/modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();

rentalsRouter.post(
  '/:id/devolution',
  ensureAuthenticated,
  devolutionRentalController.handle
);

const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRouter };
