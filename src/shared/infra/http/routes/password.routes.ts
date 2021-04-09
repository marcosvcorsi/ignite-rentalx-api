import { Router } from 'express';

import { ResetPasswordUserController } from '@/modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@/modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordsRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordsRouter.post('/forgot', sendForgotPasswordMailController.handle);

const resetPasswordUserController = new ResetPasswordUserController();

passwordsRouter.post('/reset', resetPasswordUserController.handle);

export { passwordsRouter };
