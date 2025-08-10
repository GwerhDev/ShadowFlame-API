const mongoose = require("mongoose");

const clanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  members: { type: Number, required: true },
});

module.exports = mongoose.model('Clan', clanSchema);