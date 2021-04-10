import { CreateUserTokenDto } from '@/modules/accounts/dtos/CreateUserTokenDto';
import { UserToken } from '@/modules/accounts/infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '@/modules/accounts/repositories/protocols/IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[];

  constructor() {
    this.usersTokens = [];
  }

  async create(data: CreateUserTokenDto): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async findByUserAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );

    return userToken;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(findIndex, 1);
  }
}
