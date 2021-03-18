import { Request, Response, Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const upload = multer({
  dest: './tmp',
});

const categoriesRouter = Router();

categoriesRouter.post('/', (request, response) =>
  createCategoryController.handle(request, response)
);

categoriesRouter.get('/', async (request: Request, response: Response) =>
  listCategoriesController.handle(request, response)
);

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  const { file } = request;

  console.log(file);

  return response.send();
});

export { categoriesRouter };
