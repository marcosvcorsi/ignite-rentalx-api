import { Request, Response, Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );

    const category = createCategoryService.execute({ name, description });

    return response.status(201).json(category);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

categoriesRouter.get('/', (request: Request, response: Response) => {
  const categories = categoriesRepository.findAll();

  return response.json(categories);
});

export { categoriesRouter };
