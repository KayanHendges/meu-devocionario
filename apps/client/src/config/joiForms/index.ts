import Joi from "joi";

export const nameFormField = Joi.string().min(2).max(200);
export const emailFormField = Joi.string().email({ tlds: { allow: false } });
export const passwordFormField = Joi.string().min(8).max(200);
