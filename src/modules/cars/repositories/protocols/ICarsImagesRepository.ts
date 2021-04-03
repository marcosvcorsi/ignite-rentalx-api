import { CreateCarImageDto } from '../../dtos/CreateCarImageDto';
import { CarImage } from '../../infra/typeorm/entities/CarImage';

export interface ICarsImagesRepository {
  create(data: CreateCarImageDto): Promise<CarImage>;
}
