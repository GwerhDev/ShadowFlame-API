const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  username: { type: String, required: true },
  character: { type: String, required: true },
  role: { type: String, required: true },
  resonance: { type: Number, required: true },
  class: { type: String, required: true },
  whatsapp: { type: String, required: false },
});

module.exports = mongoose.model('Member', memberSchema);