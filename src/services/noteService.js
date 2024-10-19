const Note = require("../models/note");

exports.getNotes = async ({ isArchive = false, isPinned = false }) => {
  const notes = await Note.find({ isArchive });
  return notes;
};

exports.createNote = async ({ title, note }) => {
  const newNote = await Note.create({ title, note });
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
