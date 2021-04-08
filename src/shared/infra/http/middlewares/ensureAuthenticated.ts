import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@/config/auth';
import { UsersTokensRepository } from '@/modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { CustomError } from '@/shared/errors/CustomError';

type Payload = {
  sub: string;
};

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new CustomError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.refreshSecret) as Payload;

    const usersRepository = new UsersTokensRepository();
    const userToken = await usersRepository.findByUserAndToken(user_id, token);

    if (!userToken) {
      throw new CustomError('User does not exists', 401);
    }

    request.user = userToken.user;

    return next();
  } catch (error) {
    console.error(error);

    throw new CustomError('Invalid token', 401);
  }
}
