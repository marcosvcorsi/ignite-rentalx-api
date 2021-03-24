import { IUseCase } from '../../../../protocols';
import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/protocols/ISpecificationsRepository';

export class CreateSpecificationUseCase
  implements IUseCase<CreateSpecificationDto, Specification> {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: CreateSpecificationDto): Promise<Specification> {
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
