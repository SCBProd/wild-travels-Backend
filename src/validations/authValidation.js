import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/emailRegex.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
    username: Joi.string(),
  }),
};

export const loginUserSchem = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
  }),
};
