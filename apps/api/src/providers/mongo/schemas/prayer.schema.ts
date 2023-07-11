import { Prayer as PrayerClass } from '@entities/prayer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PrayerDocument = mongoose.HydratedDocument<Prayer>;

const { String, ObjectId } = mongoose.Schema.Types;

@Schema({ timestamps: true })
export class Prayer implements PrayerClass {
  @Prop({ type: ObjectId, required: true, _id: true })
  id: string;

  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  relatedCategories: string[];

  @Prop({ type: Date, default: Date.now })
  modified: Date;

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const PrayerSchema = SchemaFactory.createForClass(Prayer);
