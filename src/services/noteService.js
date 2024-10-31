const Note = require("../models/note");

exports.getNotes = async (data) => {
  const notes = await Note.find(data);
  return notes;
};

exports.createNote = async (data) => {
  const newNote = await Note.create(data);
  return newNote;
};

exports.updateNote = async ({ _id, ...rest }) => {
  if (rest.isArchive) rest.isPinned = false;
  if (rest.isPinned) rest.isArchive = false;
  await Note.updateOne({ _id }, rest);
};

exports.deleteNote = async (_id) => {
  await Note.deleteOne({ _id });
};
