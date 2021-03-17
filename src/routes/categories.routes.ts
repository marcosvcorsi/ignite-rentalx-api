import { Request, Response, Router } from 'express';

import { MemoryCategoriesRepository } from '../repositories/implementations/MemoryCategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();

const memoryCategoriesRepository = new MemoryCategoriesRepository();

categoriesRouter.post('/', async (request: Request, response: Response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      memoryCategoriesRepository
    );

    const category = await createCategoryService.execute({ name, description });

    return response.status(201).json(category);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: error.message });
  }
});

categoriesRouter.get('/', async (request: Request, response: Response) => {
  const categories = await memoryCategoriesRepository.findAll();

  return response.json(categories);
});

export { categoriesRouter };
