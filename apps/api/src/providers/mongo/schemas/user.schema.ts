import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User as UserClass } from '@entities/user';

export type UserDocument = mongoose.HydratedDocument<UserClass>;

const { String } = mongoose.Schema.Types;

@Schema({ timestamps: true })
export class User implements UserClass {
  id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  updatedAt: Date;
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
