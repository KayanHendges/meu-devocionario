import Joi from "joi";
import { CreateCategoryDTO } from "project-common";

export const CreateOrUpdateCategoryFormSchema = Joi.object<CreateCategoryDTO>({
  name: Joi.string(),
  description: Joi.string().optional().allow(""),
});
