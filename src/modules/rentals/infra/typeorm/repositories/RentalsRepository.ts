import { getRepository, IsNull, Repository } from 'typeorm';

import { CreateRentalDto } from '@/modules/rentals/dtos/CreateRentalDto';
import { IRentalsRepository } from '@/modules/rentals/repositories/protocols/IRentalsRepository';

import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: IsNull(),
      },
    });

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: IsNull(),
      },
    });

    return rental;
  }

  async create(data: CreateRentalDto): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async update(id: string, data: Partial<Rental>): Promise<void> {
    const rental = await this.repository.findOne(id);

    await this.repository.save({
      ...rental,
      ...data,
    });
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    });

    return rentals;
  }
}
