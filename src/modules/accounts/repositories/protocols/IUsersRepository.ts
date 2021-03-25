import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/User';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
