import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const createCategoryUseCase = new CreateCategoryUseCase(
  CategoriesRepository.getInstance()
);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export { createCategoryUseCase, createCategoryController };
