import { getRepository, Repository } from 'typeorm';

import { CreateCategoryDto } from '@/modules/cars/dtos/CreateCategoryDto';
import { Category } from '@/modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@/modules/cars/repositories/protocols/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: CreateCategoryDto): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);

    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    return category;
  }
}
