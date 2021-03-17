import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../protocols/ICategoriesRepository';

export class MemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: CreateCategoryDto): Promise<Category> {
    const category = new Category({
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}
