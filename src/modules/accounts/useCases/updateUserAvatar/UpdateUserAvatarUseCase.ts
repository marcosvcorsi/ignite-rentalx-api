import { inject, injectable } from 'tsyringe';

import { IUseCase } from '../../../../protocols';
import { UpdateUserAvatarDto } from '../../dtos/UpdateUserAvatarDto';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

@injectable()
export class UpdateUserAvatarUseCase
  implements IUseCase<UpdateUserAvatarDto, void> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: UpdateUserAvatarDto): Promise<void> {
    await this.usersRepository.update(user_id, { avatar: avatar_file });
  }
}
