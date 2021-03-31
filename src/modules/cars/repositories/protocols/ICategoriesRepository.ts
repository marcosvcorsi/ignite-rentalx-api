import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../infra/typeorm/entities/Category';

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  create(data: CreateCategoryDto): Promise<Category>;
}
