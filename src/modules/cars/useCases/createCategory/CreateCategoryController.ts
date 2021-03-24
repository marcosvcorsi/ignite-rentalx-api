import { Request, Response } from 'express';

import { IController, IUseCase } from '../../../../protocols';
import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { Category } from '../../entities/Category';

export class CreateCategoryController implements IController {
  constructor(
    private readonly createCategoryUseCase: IUseCase<
      CreateCategoryDto,
      Category
    >
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const category = await this.createCategoryUseCase.execute({
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
