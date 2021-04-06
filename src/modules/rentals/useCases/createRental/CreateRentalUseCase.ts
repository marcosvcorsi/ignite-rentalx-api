import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { CreateRentalDto } from '../../dtos/CreateRentalDto';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/protocols/IRentalsRepository';

const MINIMUM_HOURS_TO_RENT = 24;

@injectable()
export class CreateRentalUseCase implements IUseCase<CreateRentalDto, Rental> {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: CreateRentalDto): Promise<Rental> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new CustomError('Car not found', 404);
    }

    const carIsUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carIsUnavailable) {
      throw new CustomError('Car is unavailable');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userHasOpenRental) {
      throw new CustomError('there is a rental in progress for this user');
    }

    const expectedDateDiff = this.dateProvider.diffInHours(
      expected_return_date,
      new Date()
    );

    if (expectedDateDiff < MINIMUM_HOURS_TO_RENT) {
      throw new CustomError('Rental return date should be one day minimum');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.update(car_id, { available: false });

    return rental;
  }
}
