import { v4 as uuid } from 'uuid';

export class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor({ name, description, created_at }: Partial<Category>) {
    if (!this.id) {
      this.id = uuid();
    }

    Object.assign(this, { name, description, created_at });
  }
}
