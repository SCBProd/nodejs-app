import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

// GET all notes (захищено)
router.get(
  '/',
  authenticate,
  celebrate(getAllNotesSchema),
  getAllNotes,
);

// GET note by id
router.get(
  '/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  getNoteById,
);

// CREATE note
router.post(
  '/',
  authenticate,
  celebrate(createNoteSchema),
  createNote,
);

// DELETE note
router.delete(
  '/:noteId',
  authenticate,
  celebrate(noteIdSchema),
  deleteNote,
);

// UPDATE note
router.patch(
  '/:noteId',
  authenticate,
  celebrate(updateNoteSchema),
  updateNote,
);

export default router;
