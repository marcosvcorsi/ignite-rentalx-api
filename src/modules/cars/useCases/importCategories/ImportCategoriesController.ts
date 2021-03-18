import { Request, Response } from 'express';

import { IController, IUseCase } from '../../../../protocols';

export class ImportCategoriesController implements IController {
  constructor(
    private readonly importCategoriesUseCase: IUseCase<
      Express.Multer.File,
      void
    >
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategoriesUseCase.execute(file);

    return response.status(204).send();
  }
}
