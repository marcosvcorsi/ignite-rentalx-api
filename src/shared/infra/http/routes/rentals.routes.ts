import { Router } from 'express';

import { CreateRentalController } from '@/modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalsRouter };
