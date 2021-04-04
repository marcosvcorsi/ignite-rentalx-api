import 'reflect-metadata';

import 'express-async-errors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from '@/shared/infra/http/middlewares/errorHandler';
import { routes } from '@/shared/infra/http/routes';
import createConnection from '@/shared/infra/typeorm';

import swaggerConfigFile from '../../../../docs/swagger.json';

import '../../container';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile));

app.use(routes);

app.use(errorHandler);

export { app };
