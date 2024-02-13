const mongoose = require("mongoose");

const clanTasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  repeat: [{ type: Number, required: false}],
  completedDate: [{ type: Date, required: false}],
});

module.exports = mongoose.model('ClanTasks', clanTasksSchema);
