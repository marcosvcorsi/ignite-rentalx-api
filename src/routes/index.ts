import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { categoriesRouter } from './categories.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/sessions', authenticateRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);

export { routes };
