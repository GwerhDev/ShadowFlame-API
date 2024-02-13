const mongoose = require("mongoose");

const fixedTasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  repeat: [{ type: Number, required: false}],
});

module.exports = mongoose.model('FixedTasks', fixedTasksSchema);
