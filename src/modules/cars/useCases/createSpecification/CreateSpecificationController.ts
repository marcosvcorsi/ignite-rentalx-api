import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/protocols';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  }
}
