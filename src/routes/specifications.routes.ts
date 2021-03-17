import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRouter = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post('/', async (request, response) => {
  const { name, description } = request.body;

  try {
    const createSpecificationService = new CreateSpecificationService(
      specificationsRepository
    );

    const specification = await createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: error.message });
  }
});

export { specificationsRouter };
