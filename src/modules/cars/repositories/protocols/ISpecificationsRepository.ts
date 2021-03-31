import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Category } from '../../infra/typeorm/entities/Category';
import { Specification } from '../../infra/typeorm/entities/Specification';

export interface ISpecificationsRepository {
  create(data: CreateSpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Category>;
}
