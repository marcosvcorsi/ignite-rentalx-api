import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerConfigFile from './docs/swagger.json';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfigFile));

app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
