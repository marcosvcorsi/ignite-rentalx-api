import { getRepository, Repository } from 'typeorm';

import { CreateCarDto } from '@/modules/cars/dtos/CreateCarDto';
import { FilterCarsDto } from '@/modules/cars/dtos/ListCarsDto';
import { ICarsRepository } from '@/modules/cars/repositories/protocols/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: CreateCarDto): Promise<Car> {
    const car = this.repository.create(data);

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async findAllAvailable({
    brand,
    category_id,
    name,
  }: FilterCarsDto): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('cars');

    carsQuery.where('cars.available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('cars.name ilike :name', { name: `%${name}%` });
    }

    if (brand) {
      carsQuery.andWhere('cars.brand ilike :brand', { brand: `%${brand}%` });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async update(id: string, data: Partial<Car>): Promise<void> {
    const car = await this.repository.findOne(id);

    await this.repository.save({
      ...car,
      ...data,
    });
  }
}
