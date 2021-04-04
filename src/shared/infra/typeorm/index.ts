import { Connection, createConnection, getConnectionOptions } from 'typeorm';

getConnectionOptions();

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  const env = process.env.NODE_ENV as string;

  const databaseName = options.database as string;

  const database =
    env && !databaseName.includes(env)
      ? `${databaseName}_${env}`
      : databaseName;

  return createConnection(Object.assign(options, { database }));
};
