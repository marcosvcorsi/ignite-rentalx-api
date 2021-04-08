import { Router } from 'express';

import { AuthenticateUserController } from '@/modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@/modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post('/', authenticateUserController.handle);

const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export { authenticateRouter };
