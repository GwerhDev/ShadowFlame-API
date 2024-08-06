const mongoose = require("mongoose");

const crestSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  legendaryFound: { type: Boolean, default: false },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
});

module.exports = mongoose.model('Crest', crestSchema);
