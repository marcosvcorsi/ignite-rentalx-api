import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/protocols/IDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/protocols/IMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/protocols/IStorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);

const storagesProviders = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storagesProviders[process.env.STORAGE]
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
);
