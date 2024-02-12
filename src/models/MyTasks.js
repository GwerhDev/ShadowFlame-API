const mongoose = require("mongoose");

const myTasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  index: { type: Number, required: true },
  date: { type: Date, required: false},
  fixed: { type: Boolean, required: false},
  repeat: [{ type: Number, required: false}],
  repeatTimes: { type: Number, required: false},
  completedDates: [{ type: Date, required: false}],
});

module.exports = mongoose.model('MyTasks', myTasksSchema);
