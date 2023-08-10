import { stripHtml } from '@global/utils.ts/formatters';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { Category as ICategory } from 'project-types';
import { v4 as uuidv4 } from 'uuid';

interface ContructorProps {
  id?: string;
  name: string;
  description?: string | null;
  updatedAt?: Date;
  createdAt?: Date;
}

export class Category implements ICategory {
  @IsString()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string | null = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cleanDescription: string | null = null;

  @IsDate()
  updatedAt: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || uuidv4();
    Object.assign(this, props);
    if (this.description) this.cleanDescription = stripHtml(this.description);

    const errors = validateSync(this);
    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
