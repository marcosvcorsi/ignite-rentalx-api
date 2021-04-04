import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@/../test/in-memory/repositories/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@/../test/in-memory/repositories/RentalsRepositoryInMemory';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { IRentalsRepository } from '@/modules/rentals/repositories/protocols/IRentalsRepository';
import { CreateRentalUseCase } from '@/modules/rentals/useCases/createRental/CreateRentalUseCase';
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';

describe('CreateRentalUseCase Tests', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carsRepositoryInMemory: ICarsRepository;
  let rentalsRepositoryInMemory: IRentalsRepository;
  let dateProvider: IDateProvider;

  const minimumExpectedDate = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: car.id,
      expected_return_date: minimumExpectedDate,
    });

    expect(rental).toBeDefined();
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental with invalid car', async () => {
    const promise = createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: 'invalidcar',
      expected_return_date: minimumExpectedDate,
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });

  it('should not be able to create a new rental if there is another rental open to user', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    await createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: car.id,
      expected_return_date: minimumExpectedDate,
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: 'anybrand2',
      category_id: 'anycategory2',
      daily_rate: 1,
      description: 'anydescription2',
      fine_amount: 1,
      license_plate: 'any2',
      name: 'anyname2',
    });

    const promise = createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: car2.id,
      expected_return_date: minimumExpectedDate,
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });

  it('should not be able to create a new rental if there is another rental open to car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    await createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: car.id,
      expected_return_date: minimumExpectedDate,
    });

    const promise = createRentalUseCase.execute({
      user_id: 'anyuserid2',
      car_id: car.id,
      expected_return_date: minimumExpectedDate,
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });

  it('should not be able to create a new rental if expected return date is lower than minimum', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'anybrand',
      category_id: 'anycategory',
      daily_rate: 1,
      description: 'anydescription',
      fine_amount: 1,
      license_plate: 'any',
      name: 'anyname',
    });

    const promise = createRentalUseCase.execute({
      user_id: 'anyuserid',
      car_id: car.id,
      expected_return_date: new Date(),
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });
});
