import { CreateCarDto } from '@/modules/cars/dtos/CreateCarDto';
import { FilterCarsDto } from '@/modules/cars/dtos/ListCarsDto';
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

  async findAllAvailable({
    name,
    brand,
    category_id,
  }: FilterCarsDto): Promise<Car[]> {
    const cars = this.cars
      .filter((car) => !!car.available)
      .filter((car) => !brand || car.brand.includes(brand))
      .filter((car) => !name || car.name.includes(name))
      .filter((car) => !category_id || car.category_id === category_id);

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async update(id: string, data: Partial<Car>): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);

    this.cars[findIndex] = {
      ...this.cars[findIndex],
      ...data,
    };
  }
}
