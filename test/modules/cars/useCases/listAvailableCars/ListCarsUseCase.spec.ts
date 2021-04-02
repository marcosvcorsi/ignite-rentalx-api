import { CarsRepositoryInMemory } from '@/../test/in-memory/repositories/CarsRepositoryInMemory';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { ListAvailableCarsUseCase } from '@/modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase';

describe('ListCarsUseCase Tests', () => {
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;
  let carsRepositoryInMemory: ICarsRepository;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'any',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toBeDefined();
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'any',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'anyna' });

    expect(cars).toBeDefined();
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'anybr' });

    expect(cars).toBeDefined();
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it('should be to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategoryid',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'anycategoryid',
    });

    expect(cars).toBeDefined();
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });
});
