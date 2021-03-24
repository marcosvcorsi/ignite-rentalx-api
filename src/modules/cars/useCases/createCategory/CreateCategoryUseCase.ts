import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../protocols';
import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/protocols/ICategoriesRepository';

@injectable()
export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryDto, Category> {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

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
