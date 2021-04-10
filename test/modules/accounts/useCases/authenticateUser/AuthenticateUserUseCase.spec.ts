import { UsersTokensRepositoryInMemory } from '@/../test/in-memory/repositories/UsersTokensRepositoryInMemory';
import { CreateUserDto } from '@/modules/accounts/dtos/CreateUserDto';
import { AuthenticateUserUseCase } from '@/modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@/modules/accounts/useCases/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';

import { UsersRepositoryInMemory } from '../../../../in-memory/repositories/UsersRepositoryInMemory';

describe('AuthenticateUserUseCase Tests', () => {
  let sut: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: IDateProvider;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    sut = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
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

    await expect(promise).rejects.toEqual(
      new CustomError('Email or password is incorrect')
    );
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

    await expect(promise).rejects.toEqual(
      new CustomError('Email or password is incorrect')
    );
  });
});
