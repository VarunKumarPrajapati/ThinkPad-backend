const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },

    content: {
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

    color: {
      type: String,
    },

    background: {
      type: String,
    },

    label: {
      type: String,
    },

    reminder: {
      type: Date,
      default: new Date(),
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
