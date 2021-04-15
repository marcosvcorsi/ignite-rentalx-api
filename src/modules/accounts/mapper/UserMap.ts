import { classToClass } from 'class-transformer';

import { UserResponseDto } from '../dtos/UserResponseDto';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDTO(data: User): UserResponseDto {
    const { id, name, email, avatar, driver_license, avatar_url } = data;

    const user = classToClass({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
