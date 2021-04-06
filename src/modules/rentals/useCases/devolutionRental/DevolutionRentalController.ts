import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

export class DevolutionRentalController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, user_id });

    return response.json(rental);
  }
}
