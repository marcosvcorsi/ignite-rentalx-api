import csvParse from 'csv-parse';
import fs from 'fs';

import { IUseCase } from '../../../../protocols';
import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { ICategoriesRepository } from '../../repositories/protocols/ICategoriesRepository';

export class ImportCategoriesUseCase
  implements IUseCase<Express.Multer.File, void> {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<CreateCategoryDto[]> {
    return new Promise((resolve, reject) => {
      const categories: CreateCategoryDto[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse({});

      stream.pipe(parseFile);

      parseFile.on('data', async (line) => {
        const [name, description] = line;

        categories.push({
          name,
          description,
        });
      });

      parseFile.on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      });

      parseFile.on('error', (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    await Promise.all(
      categories.map(async (category) => {
        const { name } = category;

        const categoryAlreadyExists = await this.categoriesRepository.findByName(
          name
        );

        if (!categoryAlreadyExists) {
          return this.categoriesRepository.create(category);
        }

        return Promise.resolve();
      })
    );
  }
}
