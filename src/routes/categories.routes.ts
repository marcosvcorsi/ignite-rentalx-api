import { Request, Response, Router } from 'express';

import { Category } from '../models/Category';

const categoriesRouter = Router();

const categories: Category[] = [];

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = new Category({
    name,
    description,
    created_at: new Date(),
  });

  categories.push(category);

  return response.status(201).json(category);
});

export { categoriesRouter };
