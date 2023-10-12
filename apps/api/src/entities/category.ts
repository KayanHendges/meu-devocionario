import { stripHtml } from '@global/utils.ts/formatters';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { Category as ICategory } from 'database';
import ObjectId from 'bson-objectid';

interface ContructorProps
  extends Omit<ICategory, EntityCommonOmit | 'cleanDescription'> {
  id?: string;
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

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsDate()
  createdAt: Date = new Date();

  @IsString()
  @IsNotEmpty()
  lastUpdatedBy: string;

  @IsDate()
  updatedAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || ObjectId().toHexString();
    Object.assign(this, props);
    if (this.description) this.cleanDescription = stripHtml(this.description);

    const errors = validateSync(this);
    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
