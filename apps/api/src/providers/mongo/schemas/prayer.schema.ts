import {
  LanguageCodes,
  LanguageCodesEnum,
  Prayer as PrayerClass,
} from '@entities/prayer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PrayerDocument = mongoose.HydratedDocument<Prayer>;

const { String } = mongoose.Schema.Types;

@Schema({ timestamps: true })
export class Prayer implements PrayerClass {
  id: string;

  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, default: null })
  description: string | null;

  @Prop({ type: String, default: null })
  body: string;

  @Prop({ type: String, default: null })
  cleanBody: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, enum: LanguageCodesEnum, required: true })
  language: LanguageCodes;

  @Prop({ type: [String], default: [] })
  relatedCategories: string[];

  updatedAt: Date;
  createdAt: Date;
}

export const PrayerSchema = SchemaFactory.createForClass(Prayer);
