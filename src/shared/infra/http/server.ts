import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import { routes } from 'shared/infra/http/routes';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from '@/shared/infra/http/middlewares/errorHandler';

import swaggerConfigFile from '../../../../docs/swagger.json';

import '@/shared/infra/typeorm';
import '../../container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile));

app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
