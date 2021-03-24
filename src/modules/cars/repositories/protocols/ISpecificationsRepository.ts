import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Category } from '../../entities/Category';
import { Specification } from '../../entities/Specification';

export interface ISpecificationsRepository {
  create(data: CreateSpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Category>;
}
