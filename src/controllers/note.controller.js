const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../services/noteService");

exports.getNotes = async (req, res) => {
  const notes = await getNotes(req.query);
  res.send(notes);
};

exports.createNote = async (req, res) => {
  const note = await createNote(req.body);
  res.status(201).send(note);
};

exports.updateNote = async (req, res) => {
  const updatedNote = await updateNote(req.body);
  res.send(updatedNote);
};

exports.deleteNote = async (req, res) => {
  await deleteNote(req.body._id);
  res.status(204).send();
};
