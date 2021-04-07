import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@/shared/protocols';

import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/protocols/IRentalsRepository';

@injectable()
export class ListRentalsByUserUseCase implements IUseCase<string, Rental[]> {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUser(user_id);

    return rentals;
  }
}
