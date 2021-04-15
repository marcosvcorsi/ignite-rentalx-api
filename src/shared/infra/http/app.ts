import 'reflect-metadata';
import 'dotenv/config';

import 'express-async-errors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import upload from '@/config/upload';
import { errorHandler } from '@/shared/infra/http/middlewares/errorHandler';
import { routes } from '@/shared/infra/http/routes';
import createConnection from '@/shared/infra/typeorm';

import swaggerConfigFile from '../../../../docs/swagger.json';

import '../../container';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile));

app.use('/avatars', express.static(`${upload.tmpFolder}/avatars`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(routes);

app.use(errorHandler);

export { app };
