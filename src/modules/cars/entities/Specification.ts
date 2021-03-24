import { v4 as uuid } from 'uuid';

export class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor({ name, description, created_at }: Partial<Specification>) {
    if (!this.id) {
      this.id = uuid();
    }

    Object.assign(this, { name, description, created_at });
  }
}
