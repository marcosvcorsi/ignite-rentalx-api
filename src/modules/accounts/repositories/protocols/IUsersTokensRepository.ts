import { CreateUserTokenDto } from '../../dtos/CreateUserTokenDto';
import { UserToken } from '../../infra/typeorm/entities/UserToken';

export interface IUsersTokensRepository {
  create(data: CreateUserTokenDto): Promise<UserToken>;
  findByToken(refresh_token: string): Promise<UserToken>;
  findByUserAndToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken | undefined>;
  delete(id: string): Promise<void>;
}
