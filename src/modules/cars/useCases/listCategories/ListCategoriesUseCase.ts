import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/protocols';

import { Category } from '../../entities/Category';
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
