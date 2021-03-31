import { inject, injectable } from 'tsyringe';

import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '../../repositories/protocols/ISpecificationsRepository';

@injectable()
export class CreateSpecificationUseCase
  implements IUseCase<CreateSpecificationDto, Specification> {
  constructor(
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: CreateSpecificationDto): Promise<Specification> {
    const { name, description } = data;

    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new CustomError('Specification already exists');
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
