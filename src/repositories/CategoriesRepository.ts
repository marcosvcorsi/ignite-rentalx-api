import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Category } from '../models/Category';

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: CreateCategoryDto): Category {
    const category = new Category({
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }
}
