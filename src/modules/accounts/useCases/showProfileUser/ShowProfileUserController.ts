import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { UserMap } from '../../mapper/UserMap';
import { ShowProfileUserUseCase } from './ShowProfileUserUseCase';

export class ShowProfileUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileUserUseCase = container.resolve(ShowProfileUserUseCase);

    const user = await showProfileUserUseCase.execute(id);

    return response.json(UserMap.toDTO(user));
  }
}
