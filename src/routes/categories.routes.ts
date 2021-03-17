import { Request, Response, Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

categoriesRouter.post('/', (request, response) =>
  createCategoryController.handle(request, response)
);

categoriesRouter.get('/', async (request: Request, response: Response) =>
  listCategoriesController.handle(request, response)
);

export { categoriesRouter };
