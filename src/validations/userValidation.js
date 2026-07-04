import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('string.pattern.base');
  }
  return value;
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
