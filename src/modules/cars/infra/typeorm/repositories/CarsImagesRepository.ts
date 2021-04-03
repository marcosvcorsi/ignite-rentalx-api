import { getRepository, Repository } from 'typeorm';

import { CreateCarImageDto } from '@/modules/cars/dtos/CreateCarImageDto';
import { ICarsImagesRepository } from '@/modules/cars/repositories/protocols/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(data: CreateCarImageDto): Promise<CarImage> {
    const carImage = this.repository.create(data);

    await this.repository.save(carImage);

    return carImage;
  }
}
