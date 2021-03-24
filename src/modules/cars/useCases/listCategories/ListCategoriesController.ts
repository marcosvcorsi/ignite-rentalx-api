import { Request, Response } from 'express';

import { IController, IUseCase } from '../../../../protocols';
import { Category } from '../../entities/Category';

export class ListCategoriesController implements IController {
  constructor(
    private readonly listCategoriesUseCase: IUseCase<void, Category[]>
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
