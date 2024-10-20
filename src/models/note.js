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

    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);

module.exports = Note;
