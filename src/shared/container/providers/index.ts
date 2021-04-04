import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/protocols/IDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
