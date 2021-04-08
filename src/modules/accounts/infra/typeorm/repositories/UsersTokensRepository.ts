import { getRepository, Repository } from 'typeorm';

import { CreateUserTokenDto } from '@/modules/accounts/dtos/CreateUserTokenDto';
import { IUsersTokensRepository } from '@/modules/accounts/repositories/protocols/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: CreateUserTokenDto): Promise<UserToken> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }
}
