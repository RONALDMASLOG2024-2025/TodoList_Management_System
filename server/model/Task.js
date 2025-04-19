const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    task: {
      type: String,
      required: true,
    },

    datetime: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
