import { CreateCarDto } from '@/modules/cars/dtos/CreateCarDto';
import { Car } from '@/modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create(data: CreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, data, { available: true });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }
}
