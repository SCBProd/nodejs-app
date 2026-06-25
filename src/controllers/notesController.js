import createHttpError from 'http-errors';
import { Note } from '../models/note.js';


export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
  } = req.query;

  const skip = (page - 1) * perPage;

  // базовий query через chain methods (як вимагають)
  let query = Note.find();

  if (tag) {
    query = query.where('tag').equals(tag);
  }

  if (search) {
    query = query.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  // паралельно: notes + total count
  const [notes, totalNotes] = await Promise.all([
    query
      .skip(skip)
      .limit(Number(perPage))
      .exec(),
    Note.countDocuments(
      tag || search
        ? query.getFilter()
        : {},
    ),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndUpdate(
    noteId,
    req.body,
    { returnDocument: 'after' }
  );

  if (!note) {
    throw createHttpError(404, 'note not found');
  }

  res.status(200).json(note);
};
