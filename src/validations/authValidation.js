import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/emailRegex.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(3).required(),
  }),
};

export const loginUserSchem = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
  }),
};
