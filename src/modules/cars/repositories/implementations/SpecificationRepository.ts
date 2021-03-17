import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Category } from '../../models/Category';
import { Specification } from '../../models/Specification';
import { ISpecificationsRepository } from '../protocols/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  async create(data: CreateSpecificationDto): Promise<Specification> {
    const { name, description } = data;

    const specification = new Specification({
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Category> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
