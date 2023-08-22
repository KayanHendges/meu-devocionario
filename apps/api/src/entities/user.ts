import { IsDate, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { User as IUser } from 'project-types';

interface ContructorProps
  extends Omit<IUser, 'id' | 'updatedAt' | 'createdAt'> {
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
  email: string;

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
