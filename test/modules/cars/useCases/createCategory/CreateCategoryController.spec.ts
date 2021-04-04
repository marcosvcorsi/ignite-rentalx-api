import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@/shared/infra/http/app';
import createConnection from '@/shared/infra/typeorm';

describe('CreateCategoryController Tests', () => {
  let connection: Connection;
  let token: string;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    await connection.query('DELETE FROM users');

    const id = uuid();
    const password = await hash('admin', 12);

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, is_admin) 
        VALUES 
        ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'admin', true)`
    );

    token = sign({ id }, 'secret', {
      subject: id,
      expiresIn: '1d',
    });
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM categories');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');

    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('test');
    expect(response.body.description).toBe('test');
  });

  it('should not be able to create a new category if name already exists', async () => {
    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
      });

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Category already exists');
  });
});
