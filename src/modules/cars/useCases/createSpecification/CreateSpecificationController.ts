import { Request, Response } from 'express';

import { IController, IUseCase } from '../../../../protocols';
import { CreateSpecificationDto } from '../../dtos/CreateSpecificationDto';
import { Specification } from '../../entities/Specification';

export class CreateSpecificationController implements IController {
  constructor(
    private readonly createSpecificationUseCase: IUseCase<
      CreateSpecificationDto,
      Specification
    >
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const specification = await this.createSpecificationUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(specification);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
