import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { expected_return_date, car_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      user_id: id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}
