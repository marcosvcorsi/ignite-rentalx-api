import { inject, injectable } from 'tsyringe';

import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { CreateCarSpecificationDto } from '../../dtos/CreateCarSpecificationDto';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/protocols/ICarsRepository';
import { ISpecificationsRepository } from '../../repositories/protocols/ISpecificationsRepository';

@injectable()
export class CreateCarSpecificationUseCase
  implements IUseCase<CreateCarSpecificationDto, Car> {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    car_id,
    specifications_ids,
  }: CreateCarSpecificationDto): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new CustomError('Car does not exists', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    car.specifications = specifications;

    await this.carsRepository.update(car_id, car);

    return car;
  }
}
