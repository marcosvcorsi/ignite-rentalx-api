import { Request, Response } from 'express';

export interface IController<T = void> {
  handle(request: Request, response: Response): Promise<Response<T>>;
}
