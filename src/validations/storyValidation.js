import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    img: Joi.string(),
    title: Joi.string().min(2).max(40).required(),
    article: Joi.string().min(12).max(3000).required(),
    category: Joi.string().required(),
    rate: Joi.number().integer().min(1).max(100),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  }),
};

export const getStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(12),
    category: Joi.string().hex().length(24).optional(),
    type: Joi.string().valid('popular').optional(),
  }),
};

export const getStoryByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};
