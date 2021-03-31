import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@/modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '@/modules/cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '@/modules/cars/useCases/listCategories/ListCategoriesController';

const upload = multer({
  dest: './tmp',
});

const categoriesRouter = Router();

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();

categoriesRouter.get('/', listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
);

export { categoriesRouter };
