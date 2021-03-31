import { CreateCategoryDto } from '../../../src/modules/cars/dtos/CreateCategoryDto';
import { Category } from '../../../src/modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../../../src/modules/cars/repositories/protocols/ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = new Category();

    Object.assign(category, data);

    this.categories.push(category);

    return category;
  }
}
