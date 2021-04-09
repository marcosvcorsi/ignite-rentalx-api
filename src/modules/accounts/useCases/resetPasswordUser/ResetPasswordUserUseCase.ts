import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@/shared/container/providers/DateProvider/protocols/IDateProvider';
import { CustomError } from '@/shared/errors/CustomError';
import { IUseCase } from '@/shared/protocols';

import { ResetPasswordDto } from '../../dtos/ResetPasswordDto';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/protocols/IUsersTokensRepository';

@injectable()
export class ResetPasswordUserUseCase
  implements IUseCase<ResetPasswordDto, void> {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: ResetPasswordDto): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new CustomError('Invalid token');
    }

    if (this.dateProvider.isBefore(userToken.expires_date, new Date())) {
      throw new CustomError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 12);

    await this.usersRepository.update(user.id, user);

    await this.usersTokensRepository.delete(userToken.id);
  }
}
