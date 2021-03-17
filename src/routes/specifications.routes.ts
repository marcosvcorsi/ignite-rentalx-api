import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRouter = Router();

specificationsRouter.post('/', async (request, response) =>
  createSpecificationController.handle(request, response)
);

export { specificationsRouter };
