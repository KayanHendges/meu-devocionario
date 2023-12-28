import Joi from "joi";
import { CreatePrayerDTO } from "project-common";

export const CreateOrUpdatePrayerFormSchema = Joi.object<CreatePrayerDTO>({
  title: Joi.string(),
  description: Joi.string().optional(),
  body: Joi.string(),
  categoryId: Joi.string(),
  relatedCategoriesId: Joi.array().items(Joi.string()),
  language: Joi.string().default("pt_BR"),
});
