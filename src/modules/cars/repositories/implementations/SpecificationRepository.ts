import { getRepository, Repository } from 'typeorm';

import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Category } from '../../entities/Category';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../protocols/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create(data: CreateSpecificationDto): Promise<Specification> {
    const { name, description } = data;

    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Category> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }
}
