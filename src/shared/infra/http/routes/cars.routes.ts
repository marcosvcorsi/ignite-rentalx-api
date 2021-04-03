import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@/config/upload';
import { CreateCarController } from '@/modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@/modules/cars/useCases/createCarSpecification/CreateCarSpecificationController.1';
import { ListAvailableCarsController } from '@/modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarsImagesController } from '@/modules/cars/useCases/uploadCarImage/UploadCarsImagesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureUserIsAdmin } from '../middlewares/ensureUserIsAdmin';

const carsRouter = Router();

const upload = multer(uploadConfig.upload('./public/cars'));

const createCarController = new CreateCarController();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);

const createCarSpecificationController = new CreateCarSpecificationController();

carsRouter.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarSpecificationController.handle
);

const uploadCarsImagesController = new UploadCarsImagesController();

carsRouter.post(
  '/:id/images',
  ensureAuthenticated,
  ensureUserIsAdmin,
  upload.array('files'),
  uploadCarsImagesController.handle
);

const listAvailableCarsController = new ListAvailableCarsController();

carsRouter.get('/available', listAvailableCarsController.handle);

export { carsRouter };
