const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../services/noteService");

exports.getNotes = async (req, res) => {
  const notes = await getNotes({ userId: req.user._id, ...req.query });
  res.send(notes);
};

exports.createNote = async (req, res) => {
  const note = await createNote({ userId: req.user._id, ...req.body });
  res.status(201).send(note);
};

exports.updateNote = async (req, res) => {
  await updateNote(req.params.id, req.body);
  res.status(204).send();
};

exports.deleteNote = async (req, res) => {
  await deleteNote(req.params.id);
  res.status(204).send();
};
