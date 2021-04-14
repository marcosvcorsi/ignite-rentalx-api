import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@/shared/container/providers/StorageProvider/protocols/IStorageProvider';
import { IUseCase } from '@/shared/protocols';

import { UpdateUserAvatarDto } from '../../dtos/UpdateUserAvatarDto';
import { IUsersRepository } from '../../repositories/protocols/IUsersRepository';

@injectable()
export class UpdateUserAvatarUseCase
  implements IUseCase<UpdateUserAvatarDto, void> {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: UpdateUserAvatarDto): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const avatarsFolder = 'avatars';

    await this.storageProvider.save(avatarsFolder, avatar_file);

    await this.usersRepository.update(user_id, { avatar: avatar_file });

    if (user.avatar) {
      this.storageProvider.delete(avatarsFolder, user.avatar);
    }
  }
}
