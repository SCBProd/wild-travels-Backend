import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getUserByIdSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().custom(objectIdValidator),
    search: Joi.string(),
    sortBy: Joi.string().valid('_id', 'title', 'createdAt').default('_id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
