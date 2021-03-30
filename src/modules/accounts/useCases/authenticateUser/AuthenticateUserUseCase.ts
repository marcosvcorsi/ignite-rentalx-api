import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { CustomError } from '@/errors/CustomError';
import { IUseCase } from '@/protocols';

import { AuthenticateUserDto } from '../../dtos/AuthenticateUserDto';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

type IResponse = {
  token: string;
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
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: AuthenticateUserDto): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new CustomError('Email or password is incorrect');
    }

    const { id, name } = user;

    const token = sign({ id }, 'secret', {
      subject: id,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        name,
        email,
      },
    };
  }
}
