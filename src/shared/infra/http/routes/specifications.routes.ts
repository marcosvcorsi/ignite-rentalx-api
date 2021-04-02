import { Router } from 'express';

import { CreateSpecificationController } from '@/modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createSpecificationController.handle
);

export { specificationsRouter };
