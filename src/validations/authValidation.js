import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/emailRegex.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().pattern(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/).min(3).max(100).required().messages({
        'string.pattern.base': "Ім'я може містити тільки літери, пробіли, апостроф та дефіс",
        'string.min': "Ім'я та прізвище має містити мінімум 3 символи",
        'string.max': "Ім'я занадто довге",
      }),
  }),
};

export const loginUserSchem = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
  }),
};
