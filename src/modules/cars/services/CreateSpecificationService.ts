import { CreateCategoryDto } from '../dtos/CreateCategoryDto';
import { Specification } from '../models/Specification';

export class CreateSpecificationService {
  async execute(data: CreateCategoryDto): Promise<Specification> {
    return null;
  }
}
