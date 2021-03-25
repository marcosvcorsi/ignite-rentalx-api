import { injectable, inject } from 'tsyringe';

import { IUseCase } from '../../../../protocols';
import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

@injectable()
export class CreateUserUseCase implements IUseCase<CreateUserDto, User> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(data);

    return user;
  }
}
