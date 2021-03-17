import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Category } from '../models/Category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export class CreateCategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: CreateCategoryDto): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}
