import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { DevolutionRentalDto } from '../../dtos/DevolutionRentalDto';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/protocols/IRentalsRepository';

const MINIMUM_DAY_RENTAL = 1;

@injectable()
export class DevolutionRentalUseCase
  implements IUseCase<DevolutionRentalDto, Rental> {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: DevolutionRentalDto): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new CustomError('Rental does not exists');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const currentDate = new Date();

    const daily =
      this.dateProvider.diffInDays(currentDate, rental.start_date) ||
      MINIMUM_DAY_RENTAL;

    const delay = this.dateProvider.diffInDays(
      new Date(),
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const fineValue = delay * car.fine_amount;

      total += fineValue;
    }

    total += daily * car.daily_rate;

    rental.end_date = new Date();
    rental.total = total;

    await this.rentalsRepository.update(id, rental);

    await this.carsRepository.update(car.id, { available: true });

    return rental;
  }
}
