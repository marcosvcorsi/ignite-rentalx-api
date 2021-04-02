import { CreateCarDto } from '../../dtos/CreateCarDto';
import { Car } from '../../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: CreateCarDto): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}
