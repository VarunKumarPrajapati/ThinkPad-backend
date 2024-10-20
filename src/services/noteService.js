const Note = require("../models/note");

exports.getNotes = async ({ userId, isArchive = false }) => {
  const notes = await Note.find({ userId, isArchive });
  return notes;
};

exports.createNote = async ({ userId, title, note }) => {
  const newNote = await Note.create({ userId, title, note });
  return newNote;
};

exports.updateNote = async ({ _id, title, note, isPinned, isArchive }) => {
  if (isArchive) isPinned = false;
  if (isPinned) isArchive = false;
  await Note.updateOne({ _id }, { title, note, isPinned, isArchive });
};

exports.deleteNote = async (_id) => {
  await Note.deleteOne({ _id });
};
