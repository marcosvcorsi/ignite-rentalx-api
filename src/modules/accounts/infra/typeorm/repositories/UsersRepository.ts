import { getRepository, Repository } from 'typeorm';

import { CreateUserDto } from '../../../dtos/CreateUserDto';
import { IUsersRepository } from '../../../repositories/protocols/IUsersRepository';
import { User } from '../entities/User';

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

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const user = await this.repository.findOne(id);

    await this.repository.save({
      ...user,
      ...data,
    });
  }
}
