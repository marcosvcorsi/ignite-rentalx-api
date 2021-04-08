import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.headers['x-access-token'] as string;

    const refreshTokenUSeCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUSeCase.execute(token);

    return response.json(refresh_token);
  }
}
