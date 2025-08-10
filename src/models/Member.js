const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  battletag: { type: String, required: true },
  character: { type: String, required: true },
  resonance: { type: Number, required: false },
  whatsapp: { type: String, required: false },
  class: { type: String, required: false },
});

module.exports = mongoose.model('Member', memberSchema);