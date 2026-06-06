// src/routes/notesRoutes.js

import { Router } from 'express';
import {
  getnotes,
  getnoteById,
  createnote,
  deletenote,
  updatenote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getnotes);
router.get('/notes/:noteId', getnoteById);
router.post('/notes', createnote);
router.delete('/notes/:noteId', deletenote);
router.patch('/notes/:noteId', updatenote);

export default router;
