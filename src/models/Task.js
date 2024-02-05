const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }
});

module.exports = mongoose.model('Task', taskSchema);
