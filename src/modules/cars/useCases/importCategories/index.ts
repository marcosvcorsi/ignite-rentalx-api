import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './ImportCategoriesController';
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

const importCategoriesUseCase = new ImportCategoriesUseCase(
  CategoriesRepository.getInstance()
);

const importCategoriesController = new ImportCategoriesController(
  importCategoriesUseCase
);

export { importCategoriesController, importCategoriesUseCase };
