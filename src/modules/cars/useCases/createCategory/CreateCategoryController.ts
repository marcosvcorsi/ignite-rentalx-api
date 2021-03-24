import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../../protocols';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      const category = await createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(category);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
