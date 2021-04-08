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

  async findByUserAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken | undefined> {
    const usersToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
      relations: ['user'],
    });

    return usersToken;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
