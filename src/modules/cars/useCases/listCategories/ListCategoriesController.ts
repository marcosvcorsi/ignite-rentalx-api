import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
