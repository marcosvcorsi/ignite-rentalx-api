import { inject, injectable } from 'tsyringe';

import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { CreateCarDto } from '../../dtos/CreateCarDto';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/protocols/ICarsRepository';

@injectable()
export class CreateCarUseCase implements IUseCase<CreateCarDto, Car> {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute(data: CreateCarDto): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (carAlreadyExists) {
      throw new CustomError('Car already exists');
    }

    const car = await this.carsRepository.create(data);

    return car;
  }
}
