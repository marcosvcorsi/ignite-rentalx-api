import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../protocols/ICategoriesRepository';

export class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Promise<Category> {
    console.log(name);

    return null;
  }

  findAll(): Promise<Category[]> {
    return null;
  }

  create(data: CreateCategoryDto): Promise<Category> {
    console.log(data);

    return null;
  }
}
