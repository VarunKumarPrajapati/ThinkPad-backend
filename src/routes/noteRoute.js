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
router.patch("/update", updateNote);
router.delete("/delete", deleteNote);

module.exports = router;
