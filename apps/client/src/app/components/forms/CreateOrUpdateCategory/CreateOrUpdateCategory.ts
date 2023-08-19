import { CreateCategoryPayload } from "@providers/api/categories/types";
import Joi from "joi";

export const CreateOrUpdateCategoryFormSchema =
  Joi.object<CreateCategoryPayload>({
    name: Joi.string(),
    description: Joi.string().optional(),
  });
