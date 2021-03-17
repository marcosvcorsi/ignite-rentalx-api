import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', async (request: Request, response: Response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );

    const category = await createCategoryService.execute({ name, description });

    return response.status(201).json(category);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: error.message });
  }
});

categoriesRouter.get('/', async (request: Request, response: Response) => {
  const categories = await categoriesRepository.findAll();

  return response.json(categories);
});

export { categoriesRouter };
