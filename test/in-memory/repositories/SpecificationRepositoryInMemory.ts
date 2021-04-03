import { CreateSpecificationDto } from '@/modules/cars/dtos/CreateSpecificationDto';
import { Category } from '@/modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@/modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@/modules/cars/repositories/protocols/ISpecificationsRepository';

export class SpecificationRepositoryInMemory
  implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create(data: CreateSpecificationDto): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Category> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}
