const mongoose = require("mongoose");

const crestSchema = new mongoose.Schema({
  date: { type: Date, required: true},
  type: { type: String, required: true},
  quantity: { type: Number, required: true},
  gems: { type: mongoose.Schema.Types.ObjectId, ref: 'Gem', required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('CrestTask', crestSchema);
