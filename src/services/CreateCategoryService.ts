import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Category } from '../models/Category';
import { ICategoriesRepository } from '../repositories/protocols/ICategoriesRepository';

export class CreateCategoryService {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: CreateCategoryDto): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
