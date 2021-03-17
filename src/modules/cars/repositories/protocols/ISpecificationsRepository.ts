import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Category } from '../../models/Category';
import { Specification } from '../../models/Specification';

export interface ISpecificationsRepository {
  create(data: CreateSpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Category>;
}
