import { CustomError } from '@/errors/CustomError';
import { CreateCategoryDto } from '@/modules/cars/dtos/CreateCategoryDto';
import { CreateCategoryUseCase } from '@/modules/cars/useCases/createCategory/CreateCategoryUseCase';

import { CategoriesRepositoryInMemory } from '../../../../in-memory/repositories/CategoryRepositoryInMemory';

describe('CreateCategoryUseCase Tests', () => {
  let sut: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    sut = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const mockParams: CreateCategoryDto = {
      name: 'anyname',
      description: 'anydescription',
    };

    const response = await sut.execute(mockParams);

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a new category when name already exists', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'anyname',
      description: 'anydescription',
    });

    const mockParams: CreateCategoryDto = {
      name: 'anyname',
      description: 'anydescription',
    };

    await expect(sut.execute(mockParams)).rejects.toBeInstanceOf(CustomError);
  });
});
