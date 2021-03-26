import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../../protocols';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { file } = request;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file: file.filename,
    });

    return response.status(204).send();
  }
}
