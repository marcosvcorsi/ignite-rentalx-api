import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@/config/auth';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { AuthenticateUserDto } from '../../dtos/AuthenticateUserDto';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/protocols/IUsersTokensRepository';

type IResponse = {
  token: string;
  refresh_token;
  user: {
    name: string;
    email: string;
  };
};

@injectable()
export class AuthenticateUserUseCase
  implements IUseCase<AuthenticateUserDto, IResponse> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: AuthenticateUserDto): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new CustomError('Email or password is incorrect');
    }

    const { id, name } = user;

    const { secret, expiresIn, refreshSecret, refreshExpiresIn } = auth;

    const token = sign({ id }, secret, {
      subject: id,
      expiresIn,
    });

    const refresh_token = sign({ email }, refreshSecret, {
      subject: id,
      expiresIn: refreshExpiresIn,
    });

    const expires_date = this.dateProvider.addDays(
      new Date(),
      Number(refreshExpiresIn.replace(/\D/, ''))
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id,
    });

    return {
      token,
      refresh_token,
      user: {
        name,
        email,
      },
    };
  }
}
