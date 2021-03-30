import { hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe';

import { CustomError } from '@/errors/CustomError';
import { IUseCase } from '@/protocols';

import { CreateUserDto } from '../../dtos/CreateUserDto';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

@injectable()
export class CreateUserUseCase implements IUseCase<CreateUserDto, User> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(data: CreateUserDto): Promise<User> {
    const { name, email, password, driver_license } = data;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CustomError('User already exists');
    }

    const hashPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license,
    });

    return user;
  }
}
