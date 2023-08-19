import { ICreatePrayerPayload } from "@providers/api/prayers/types";
import Joi from "joi";

export const CreateOrUpdatePrayerFormSchema = Joi.object<ICreatePrayerPayload>({
  title: Joi.string(),
  description: Joi.string().optional(),
  body: Joi.string(),
  categoryId: Joi.string(),
  relatedCategoriesId: Joi.array().items(Joi.string()),
  language: Joi.string().default("pt_BR"),
});
