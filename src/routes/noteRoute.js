const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getDistinctNoteColors,
} = require("../controllers/note.controller");

router.get("/", getNotes);
router.post("/create", createNote);
router.patch("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);
router.get("/distinct/colors", getDistinctNoteColors);

module.exports = router;
