import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../../protocols';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const auth = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(auth);
  }
}
