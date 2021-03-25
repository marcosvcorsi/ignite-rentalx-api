import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors/CustomError';

export async function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Promise<Response> {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error' });
}
