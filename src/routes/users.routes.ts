import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.post('/', createUserController.handle);

const uploadAvatar = multer(uploadConfig.upload('./public/avatar'));

const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle
);

export { usersRouter };
