import { container } from 'tsyringe';

import { UsersRepository } from '@/modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@/modules/accounts/repositories/protocols/IUsersRepository';
import { CategoriesRepository } from '@/modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@/modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICategoriesRepository } from '@/modules/cars/repositories/protocols/ICategoriesRepository';
import { ISpecificationsRepository } from '@/modules/cars/repositories/protocols/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
