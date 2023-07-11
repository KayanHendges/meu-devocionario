import { v4 as uuidv4 } from 'uuid';

export class Prayer {
  public readonly id: string;
  title: string;
  description: string | null;
  category: string;
  relatedCategories: string[];
  modified: Date;
  created: Date;

  constructor(props: Omit<Prayer, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuidv4();
  }
}
