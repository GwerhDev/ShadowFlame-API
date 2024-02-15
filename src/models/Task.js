const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  date: { type: Date, required: false },
  type: { type: String, required: true },
  title: { type: String, required: true },
  fixed: { type: Boolean, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

module.exports = mongoose.model('Task', taskSchema);
