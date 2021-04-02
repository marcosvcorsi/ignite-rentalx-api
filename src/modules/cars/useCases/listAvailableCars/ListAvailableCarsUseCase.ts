import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/protocols';

import { FilterCarsDto } from '../../dtos/ListCarsDto';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/protocols/ICarsRepository';

@injectable()
export class ListAvailableCarsUseCase
  implements IUseCase<FilterCarsDto, Car[]> {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute(filter: FilterCarsDto): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable(filter);

    return cars;
  }
}
