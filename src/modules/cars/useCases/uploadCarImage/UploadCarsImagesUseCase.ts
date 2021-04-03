import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/protocols';

import { CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '../../repositories/protocols/ICarsImagesRepository';

export type CreateCarImagesDto = {
  car_id: string;
  filenames: string[];
};

@injectable()
export class UploadCarsImagesUseCase
  implements IUseCase<CreateCarImagesDto, CarImage[]> {
  constructor(
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({
    car_id,
    filenames,
  }: CreateCarImagesDto): Promise<CarImage[]> {
    const carsImages = await Promise.all(
      filenames.map(async (filename) => {
        const carImage = await this.carsImagesRepository.create({
          car_id,
          filename,
        });

        return carImage;
      })
    );

    return carsImages;
  }
}
