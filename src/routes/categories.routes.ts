import { Request, Response, Router } from 'express';
import { v4 as uuid } from 'uuid';

const categoriesRouter = Router();

const categories = [];

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = {
    id: uuid(),
    name,
    description,
  };

  categories.push(category);

  return response.status(201).json(category);
});

export { categoriesRouter };
