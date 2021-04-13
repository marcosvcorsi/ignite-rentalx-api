import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@/config/auth';
import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { IUsersTokensRepository } from '../../repositories/protocols/IUsersTokensRepository';

type IPayload = {
  sub: string;
  email: string;
};

type IResponse = {
  token: string;
  refresh_token: string;
};

@injectable()
export class RefreshTokenUseCase implements IUseCase<string, IResponse> {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { sub, email } = verify(token, auth.refreshSecret) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserAndToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new CustomError('Refresh token does not exists');
    }

    await this.usersTokensRepository.delete(userToken.id);

    const { refreshSecret, refreshExpiresIn, secret, expiresIn } = auth;

    const refresh_token = sign({ email }, refreshSecret, {
      subject: user_id,
      expiresIn: refreshExpiresIn,
    });

    const expires_date = this.dateProvider.addDays(
      new Date(),
      Number(refreshExpiresIn.replace(/\D/, ''))
    );

    await this.usersTokensRepository.create({
      refresh_token,
      expires_date,
      user_id,
    });

    const newToken = sign({ id: user_id }, secret, {
      subject: user_id,
      expiresIn,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}
