import { hash } from 'bcrypt';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

export async function createUserAdmin(connection: Connection): Promise<void> {
  const id = uuid();
  const password = await hash('admin', 12);

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license) 
      VALUES 
      ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'admin')`
  );
}
