import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);

export { routes };
