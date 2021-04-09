import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { IMailProvider } from '@/shared/container/providers/MailProvider/protocols/IMailProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/protocols/IUsersTokensRepository';

@injectable()
export class SendForgotPasswordMailUseCase implements IUseCase<string, void> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('MailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const token = uuid();

    const expires_date = this.dateProvider.addHours(new Date(), 3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      variables: {
        name: user.name,
        link: `${process.env.API_URL}/password/reset?token=${token}`,
      },
      path: templatePath,
    });
  }
}
