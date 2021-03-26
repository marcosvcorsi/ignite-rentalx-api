import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/User';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  update(id: string, data: Partial<User>): Promise<void>;
}
