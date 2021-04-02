import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

export class ListAvailableCarsController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableCars = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCars.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}
