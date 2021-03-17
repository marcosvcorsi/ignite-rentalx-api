import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Specification } from '../models/Specification';
import { ISpecificationsRepository } from '../repositories/protocols/ISpecificationsRepository';

export class CreateSpecificationService {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: CreateCategoryDto): Promise<Specification> {
    const { name, description } = data;

    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
