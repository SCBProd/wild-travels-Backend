import { Joi, Segments } from 'celebrate';

export const getStoryByIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    storyId: Joi.string().hex().length(24).required(),
  }),
};
