import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request, response) =>
  createCategoryController.handle(request, response)
);

categoriesRouter.get('/', async (request: Request, response: Response) => {
  const categories = await categoriesRepository.findAll();

  return response.json(categories);
});

export { categoriesRouter };
