import { Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

const isValidObjectId = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

// GET /notes
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

// GET /notes/:noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(isValidObjectId).required(),
  }),
};

// POST /notes
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string().valid(...TAGS),
  }),
};

// PATCH /notes/:noteId
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(isValidObjectId).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).or('title', 'content', 'tag'),
};

// REGISTER USER
export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
