const mongoose = require("mongoose");

const completedTaskSchema = new mongoose.Schema({
  date: { type: Date, required: true},
  type: { type: String, required: true},
  task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('CompletedTask', completedTaskSchema);
