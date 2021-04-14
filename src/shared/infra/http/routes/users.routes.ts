import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@/config/upload';
import { CreateUserController } from '@/modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@/modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);

const uploadAvatar = multer(uploadConfig);

const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle
);

export { usersRouter };
