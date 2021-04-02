import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/shared/errors/CustomError';

export async function ensureUserIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (!request.user) {
    throw new Error('User was not provided');
  }

  const { is_admin } = request.user;

  if (!is_admin) {
    throw new CustomError('User is not allowed to do this operation', 403);
  }

  return next();
}
