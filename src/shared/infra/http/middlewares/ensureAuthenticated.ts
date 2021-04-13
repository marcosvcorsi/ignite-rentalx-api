import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@/config/auth';
import { UsersRepository } from '@/modules/accounts/infra/typeorm/repositories/UsersRepository';
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
    const { sub: user_id } = verify(token, auth.secret) as Payload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new CustomError('User does not exists', 401);
    }

    request.user = user;

    return next();
  } catch (error) {
    console.error(error);

    throw new CustomError('Invalid token', 401);
  }
}
