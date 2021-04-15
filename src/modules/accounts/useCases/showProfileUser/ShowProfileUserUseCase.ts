import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/protocols';

import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

@injectable()
export class ShowProfileUserUseCase implements IUseCase<string, User> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  execute(user_id: string): Promise<User> {
    const user = this.usersRepository.findById(user_id);

    return user;
  }
}
