import { Request, Response, Router } from 'express';

const categoriesRouter = Router();

const categories = [];

categoriesRouter.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  categories.push({
    name,
    description,
  });

  return response.status(201).send();
});

export { categoriesRouter };
