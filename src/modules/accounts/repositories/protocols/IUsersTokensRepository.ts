import { CreateUserTokenDto } from '../../dtos/CreateUserTokenDto';
import { UserToken } from '../../infra/typeorm/entities/UserToken';

export interface IUsersTokensRepository {
  create(data: CreateUserTokenDto): Promise<UserToken>;
}
