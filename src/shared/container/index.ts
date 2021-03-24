import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/protocols/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/protocols/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);
