const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  completedAt: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model("task", taskSchema);
