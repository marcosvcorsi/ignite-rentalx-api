import { Router } from 'express';

import { SendForgotPasswordMailController } from '@/modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordsRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordsRouter.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordsRouter };
