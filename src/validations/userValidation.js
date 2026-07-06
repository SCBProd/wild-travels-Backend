import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('string.pattern.base');
  }
  return value;
};

export const getUsersSchema = {
  [Segments.QUERY]: Joi.object({
    perPage: Joi.number()
      .integer()
      .min(1)
      .default(10),
    page: Joi.number()
      .integer()
      .min(1)
      .default(1),
    sortBy: Joi.string().default('articlesAmount'),
    sortOrder: Joi.string()
      .valid('asc', 'desc')
      .default('asc'),
  }),
};
export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string()
      .custom(objectIdValidator)
      .required()
      .messages({
        'string.pattern.base': 'Invalid userId format',
        'any.required': 'userId is required',
      }),
  }),
};

export const removeSavedArticleSchema = {
  [Segments.PARAMS]: Joi.object({
    articleId: Joi.string()
      .custom(objectIdValidator)
      .required(),
  }),
};
