import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerConfigFile from '../docs/swagger.json';
import { errorHandler } from './middlewares/errorHandler';
import { routes } from './routes';

import './infra/database';
import './shared/container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile));

app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
