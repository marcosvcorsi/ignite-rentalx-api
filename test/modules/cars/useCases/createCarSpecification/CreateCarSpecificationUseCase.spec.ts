import { CarsRepositoryInMemory } from '@/../test/in-memory/repositories/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@/../test/in-memory/repositories/SpecificationRepositoryInMemory';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { ISpecificationsRepository } from '@/modules/cars/repositories/protocols/ISpecificationsRepository';
import { CreateCarSpecificationUseCase } from '@/modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';
import { CustomError } from '@/shared/errors/CustomError';

describe('CreateCarSpecificationUseCase Tests', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepositoryInMemory: ICarsRepository;
  let specificationRepositoryInMemory: ISpecificationsRepository;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it('should be able create a car specification on success', async () => {
    const specification = await specificationRepositoryInMemory.create({
      description: 'anydescription',
      name: 'anyname',
    });

    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategoryid',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    expect(specificationCar).toBeDefined();
    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications).toHaveLength(1);
  });

  it('should not be able to create a car specification when car does not exists', async () => {
    const promise = createCarSpecificationUseCase.execute({
      car_id: 'doesnotexists',
      specifications_ids: ['anyspecid'],
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });
});
