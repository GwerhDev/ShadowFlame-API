const mongoose = require("mongoose");

const shadowWarSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  result: { type: String, required: true },
  enemyClan: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan', required: true },
  battle: {
    exalted: {
      member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
      result: { type: String },
    },
    eminent: {
      member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
      result: { type: String },
    },
    famed: {
      member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
      result: { type: String },
    },
    proud: {
      member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
      result: { type: String },
    },
  },
  confirmed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
});

module.exports = mongoose.model('ShadowWar', shadowWarSchema);