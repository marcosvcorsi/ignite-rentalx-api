import { inject, injectable } from 'tsyringe';

import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../infra/typeorm/entities/Category';
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
      throw new CustomError('Category already exists');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
