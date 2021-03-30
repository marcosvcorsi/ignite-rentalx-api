import { CustomError } from '@/errors/CustomError';
import { CreateUserDto } from '@/modules/accounts/dtos/CreateUserDto';
import { AuthenticateUserUseCase } from '@/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@/modules/accounts/useCases/createUser/CreateUserUseCase';

import { UsesRepositoryInMemory } from '../../../../in-memory/repositories/UsersRepositoryInMemory';

describe('AuthenticateUserUseCase Tests', () => {
  let sut: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsesRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsesRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    sut = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: CreateUserDto = {
      name: 'anyname',
      email: 'anymail@mail.com',
      password: '123456',
      driver_license: 'any',
    };

    await createUserUseCase.execute(user);

    const response = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate a user when user does not exists', async () => {
    const promise = sut.execute({
      email: 'no-existing-email@mail.com',
      password: 'anypassword',
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });

  it('should not be able to authenticate a user when password is not correct', async () => {
    const user: CreateUserDto = {
      name: 'anyname',
      email: 'anymail@mail.com',
      password: '123456',
      driver_license: 'any',
    };

    await createUserUseCase.execute(user);

    const promise = sut.execute({
      email: user.email,
      password: 'invalid-password',
    });

    await expect(promise).rejects.toBeInstanceOf(CustomError);
  });
});
