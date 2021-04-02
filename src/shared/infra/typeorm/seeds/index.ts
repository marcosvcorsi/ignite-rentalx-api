import { createConnection, getConnectionOptions } from 'typeorm';

import { createUserAdmin } from './admin';

(async () => {
  const defaultOptions = await getConnectionOptions();

  console.log('Open database connection');

  const connection = await createConnection({
    ...defaultOptions,
  });

  console.log('Running seeds ...');

  await createUserAdmin(connection);

  console.log('All seeds were executed');

  await connection.close();

  console.log('Connection closed');
})();
