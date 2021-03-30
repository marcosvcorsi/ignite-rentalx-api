import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/protocols';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const users = await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).json(users);
  }
}
