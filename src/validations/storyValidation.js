import { Joi, Segments } from 'celebrate';

export const getStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1),

    perPage: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(12),

    category: Joi.string()
      .hex()
      .length(24)
      .optional(),

    type: Joi.string()
      .valid('popular')
      .optional(),
  }),
};

export const getStoryByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string()
      .hex()
      .length(24)
      .required(),
  }),
};
