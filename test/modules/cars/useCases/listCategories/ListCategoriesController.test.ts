import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Category } from '@/modules/cars/infra/typeorm/entities/Category';
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { app } from '@/shared/infra/http/app';
import createConnection from '@/shared/infra/typeorm';

describe('ListCategoriesController Tests', () => {
  let connection: Connection;
  let token: string;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    await connection.query('DELETE FROM users_tokens');
    await connection.query('DELETE FROM users');

    const id = uuid();
    const password = await hash('admin', 12);

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, is_admin) 
        VALUES 
        ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'admin', true)`
    );

    token = sign({ id }, 'refreshSecret', {
      subject: id,
      expiresIn: '1d',
    });

    const expires_date = new DayjsDateProvider().addHours(new Date(), 3);

    await connection.query(
      `INSERT INTO users_tokens(id, refresh_token, user_id, expires_date) 
        VALUES 
        ('${uuid()}', '${token}', '${id}', '${expires_date.toISOString()}')`
    );
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM categories');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users_tokens');
    await connection.query('DELETE FROM users');

    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const repository = getRepository(Category);

    const category = repository.create({
      name: 'test',
      description: 'test',
    });

    await repository.save(category);

    const response = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(category.name);
    expect(response.body[0].description).toBe(category.description);
  });
});
