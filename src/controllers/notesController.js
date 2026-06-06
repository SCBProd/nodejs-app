// src/controllers/notesController.js
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Отримати список усіх студентів
export const getnotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

// Отримати одного студента за id
export const getnoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById( noteId );

  if (!note) {
	throw createHttpError(404, 'note not found');
  }

  res.status(200).json(note);
};
export const createnote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};
export const deletenote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    throw createHttpError(404, "note not found");
  }

  res.status(200).json(note);
};

export const updatenote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { returnDocument: "after" }, // повертаємо оновлений документ
  );

  if (!note) {
	throw createHttpError(404, 'note not found');
  }

  res.status(200).json(note);
};
