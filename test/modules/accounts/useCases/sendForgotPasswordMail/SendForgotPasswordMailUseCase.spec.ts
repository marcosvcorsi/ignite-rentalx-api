import { MailProviderInMemory } from '@/../test/in-memory/providers/MailProviderInMemory';
import { UsersRepositoryInMemory } from '@/../test/in-memory/repositories/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@/../test/in-memory/repositories/UsersTokensRepositoryInMemory';
import { IUsersRepository } from '@/modules/accounts/repositories/protocols/IUsersRepository';
import { IUsersTokensRepository } from '@/modules/accounts/repositories/protocols/IUsersTokensRepository';
import { SendForgotPasswordMailUseCase } from '@/modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase';
import { DayjsDateProvider } from '@/shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { IMailProvider } from '@/shared/container/providers/MailProvider/protocols/IMailProvider';
import { CustomError } from '@/shared/errors/CustomError';

describe('SendForgotPasswordMailUseCase Tests', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepository: IUsersRepository;
  let usersTokensRepository: IUsersTokensRepository;
  let mailProvider: IMailProvider;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to create a token', async () => {
    const user = await usersRepository.create({
      email: 'anymail@mail.com',
      name: 'anyname',
      password: 'anypassword',
      driver_license: 'anydl',
    });

    const createSpy = jest.spyOn(usersTokensRepository, 'create');

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(createSpy).toHaveBeenCalled();
  });

  it('should be able send forgot password email', async () => {
    const user = await usersRepository.create({
      email: 'anymail@mail.com',
      name: 'anyname',
      password: 'anypassword',
      driver_license: 'anydl',
    });

    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail');

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able send forgot password email when user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('invalidmail@mail.com')
    ).rejects.toEqual(new CustomError('User not found', 404));
  });
});
