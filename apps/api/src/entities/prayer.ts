import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

// Todo: fix generic type
interface ContructorProps {
  id?: string;
  title: string;
  description: string | null;
  category: string;
  relatedCategories?: string[];
  updatedAt?: Date;
  createdAt?: Date;
}

export class Prayer {
  @IsString()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string | null = null;

  @IsString()
  @IsNotEmpty()
  category: string;

  // Todo: set limit of items
  @IsString({ each: true })
  @IsOptional()
  relatedCategories: string[] = [];

  @IsDate()
  updatedAt: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || uuidv4();
    Object.assign(this, props);
    const errors = validateSync(this);
    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
