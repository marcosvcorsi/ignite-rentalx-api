import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../../protocols';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const auth = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(auth);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
