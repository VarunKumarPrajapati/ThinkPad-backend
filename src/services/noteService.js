const Note = require("../models/note");

exports.getNotes = async (data) => {
  const notes = await Note.find(data).sort({ updatedAt: -1 });
  return notes;
};

exports.createNote = async (data) => {
  const newNote = await Note.create(data);
  return newNote;
};

exports.updateNote = async (_id, data) => {
  if (data.isArchive) data.isPinned = false;
  if (data.isPinned) data.isArchive = false;

  const ignoreAttr = ["createdAt", "updatedAt", "_id", "__v", "userId"];
  ignoreAttr.forEach((attr) => delete data[attr]);

  await Note.updateOne({ _id }, data);
};

exports.deleteNote = async (_id) => {
  await Note.deleteOne({ _id });
};

exports.getDistinctColors = async (userId) => {
  const colors = await Note.distinct("color", { userId });
  return colors;
};
