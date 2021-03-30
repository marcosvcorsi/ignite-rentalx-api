import { CreateUserDto } from '../../../src/modules/accounts/dtos/CreateUserDto';
import { User } from '../../../src/modules/accounts/entities/User';
import { IUsersRepository } from '../../../src/modules/accounts/repositories/protocols/IUsersRepository';

export class UsesRepositoryInMemory implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const user = this.users[userIndex];

    this.users[userIndex] = {
      ...user,
      ...data,
    };
  }
}
