const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    note: {
      type: String,
    },
    
    isArchive: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

module.exports = Note;
