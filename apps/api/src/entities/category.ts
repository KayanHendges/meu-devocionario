import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

interface ContructorProps {
  id?: string;
  name: string;
  description?: string | null;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Category {
  @IsString()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string | null = null;

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
