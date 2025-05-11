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
      default: "Default",
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

noteSchema.methods.toJSON = function () {
  const note = this.toObject();
  
  delete note.__v;
  delete note.userId;
  delete note.createdAt;
  delete note.updatedAt;

  return note;
};

const Note = model("Note", noteSchema);

module.exports = Note;
