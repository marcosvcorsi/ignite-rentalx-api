import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '@/shared/protocols';

import { UploadCarsImagesUseCase } from './UploadCarsImagesUseCase';

export class UploadCarsImagesController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const files = request.files as Express.Multer.File[];

    const filenames = files.map((file) => file.filename);

    const updateCarImageUseCase = container.resolve(UploadCarsImagesUseCase);

    const carsImages = await updateCarImageUseCase.execute({
      car_id: id,
      filenames,
    });

    return response.status(201).json(carsImages);
  }
}
