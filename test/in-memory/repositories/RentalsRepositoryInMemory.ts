import { CreateRentalDto } from '@/modules/rentals/dtos/CreateRentalDto';
import { Rental } from '@/modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@/modules/rentals/repositories/protocols/IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async create(data: CreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, data, { start_date: new Date() });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }
  async update(id: string, data: Partial<Rental>): Promise<void> {
    const findIndex = this.rentals.findIndex((rental) => rental.id === id);

    this.rentals[findIndex] = {
      ...this.rentals[findIndex],
      ...data,
    };
  }
}
