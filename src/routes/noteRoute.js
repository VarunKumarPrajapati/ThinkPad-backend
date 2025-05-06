const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

router.get("/", getNotes);
router.post("/create", createNote);
router.patch("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router;
