import { Router } from 'express';

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

const router = Router();

// GET all notes + filter + pagination
router.get('/notes', getAllNotesSchema, getAllNotes);

// GET note by id
router.get('/notes/:noteId', noteIdSchema, getNoteById);

// CREATE note
router.post('/notes', createNoteSchema, createNote);

// DELETE note
router.delete('/notes/:noteId', noteIdSchema, deleteNote);

// UPDATE note
router.patch('/notes/:noteId', updateNoteSchema, updateNote);

export default router;
