import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/User';
import { IUsersRepository } from '../protocols/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }
}
