import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
    });

    return response.status(201).json(car);
  }
}
