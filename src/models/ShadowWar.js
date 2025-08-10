const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  group1: {
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  },
  group2: {
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  },
  result: { type: String },
});

const shadowWarSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  result: { type: String, required: true },
  enemyClan: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan', required: true },
  battle: {
    exalted: [matchSchema],
    eminent: [matchSchema],
    famed: [matchSchema],
    proud: [matchSchema],
  },
  confirmed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
});

module.exports = mongoose.model('ShadowWar', shadowWarSchema);