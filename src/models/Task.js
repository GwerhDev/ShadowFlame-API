const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  index: { type: Number, required: true },
  repeat: { type: Boolean, required: false},
  completed: { type: Boolean, required: false},
  repeatType: { type: String, required: false},
});

module.exports = mongoose.model('Task', taskSchema);
