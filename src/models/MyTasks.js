const mongoose = require("mongoose");

const myTasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  index: { type: Number, required: true },
  date: { type: Date, required: false},
  completed: { type: Boolean, required: false},
});

module.exports = mongoose.model('MyTasks', myTasksSchema);
