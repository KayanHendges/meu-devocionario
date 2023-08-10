import { Category as CategoryClass } from '@entities/category';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CategoryDocument = mongoose.HydratedDocument<Category>;

const { String } = mongoose.Schema.Types;

@Schema({ timestamps: true })
export class Category implements Omit<CategoryClass, 'id'> {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: null })
  cleanDescription: string | null;

  updatedAt: Date;
  createdAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
