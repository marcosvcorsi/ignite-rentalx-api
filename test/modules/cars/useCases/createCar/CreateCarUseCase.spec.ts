import { CarsRepositoryInMemory } from '@/../test/in-memory/repositories/CarsRepositoryInMemory';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { CreateCarUseCase } from '@/modules/cars/useCases/createCar/CreateCarUseCase';
import { CustomError } from '@/shared/errors/CustomError';

describe('CreateCarUseCase Tests', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: ICarsRepository;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a car', async () => {
    const response = await createCarUseCase.execute({
      brand: 'any',
      category_id: 'anycategoryid',
      daily_rate: 100,
      description: 'anydescription',
      fine_amount: 10,
      name: 'anyname',
      license_plate: 'ANY',
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id');
    expect(response.name).toBe('anyname');
  });

  it('should not be able to create a car with duplicated license plate', async () => {
    await carsRepositoryInMemory.create({
      brand: 'any',
      category_id: 'anycategoryid',
      daily_rate: 100,
      description: 'anydescription',
      fine_amount: 10,
      name: 'anyname',
      license_plate: 'ANY',
    });

    const promise = createCarUseCase.execute({
      brand: 'any',
      category_id: 'anycategoryid',
      daily_rate: 100,
      description: 'anydescription',
      fine_amount: 10,
      name: 'anyname',
      license_plate: 'ANY',
    });

    await expect(promise).rejects.toEqual(
      new CustomError('Car already exists')
    );
  });

  it('should be able to create a car with available true by default', async () => {
    const response = await createCarUseCase.execute({
      brand: 'any',
      category_id: 'anycategoryid',
      daily_rate: 100,
      description: 'anydescription',
      fine_amount: 10,
      name: 'anyname',
      license_plate: 'ANY',
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('available');
    expect(response.available).toBeTruthy();
  });
});
