const mongoose = require("mongoose");

const clanTasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  index: { type: Number, required: true },
  repeat: { type: Boolean, required: false},
  repeatTimes: { type: Number, required: false},
  completedDate: [{ type: Date, required: false}],
});

module.exports = mongoose.model('ClanTasks', clanTasksSchema);
