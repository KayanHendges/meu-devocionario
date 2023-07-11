import { v4 as uuidv4 } from 'uuid';

export class Category {
  public readonly id: string;
  name: string;
  description: string | null;
  modified: Date;
  created: Date;

  constructor(props: Omit<Category, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
