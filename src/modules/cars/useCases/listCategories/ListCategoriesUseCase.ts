import { IUseCase } from '../../../../protocols';
import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/protocols/ICategoriesRepository';

export class ListCategoriesUseCase implements IUseCase<void, Category[]> {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
