import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  validateSync,
} from 'class-validator';
import { User as IUser, UserRole } from 'database';
import ObjectID from 'bson-objectid';

interface ContructorProps extends Omit<IUser, EntityCommonOmit> {
  id?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export class User implements IUser {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDate()
  updatedAt: Date = new Date();

  @IsDate()
  createdAt: Date = new Date();

  constructor(props: ContructorProps) {
    props.id = props.id || ObjectID().toHexString();
    Object.assign(this, props);

    const errors = validateSync(this);

    if (errors.length) throw new Error(JSON.stringify(errors, undefined, 2));
  }
}
