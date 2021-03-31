import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/protocols';

import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../../repositories/protocols/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase implements IUseCase<void, Category[]> {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
