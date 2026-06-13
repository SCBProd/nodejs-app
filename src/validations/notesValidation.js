import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const isValidObjectId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const updateNoteSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(isValidObjectId).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  })
    .or('title', 'content', 'tag') 
    .required()
    .messages({
      'object.missing': 'At least one field (title, content, tag) is required',
    }),
});
