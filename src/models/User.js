const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    battlenetId: { type: String, required: true },
    battletag: { type: String, required: true },
    provider: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    warband: { type: mongoose.Schema.Types.ObjectId, ref: 'Warband', required: false },
});

module.exports = mongoose.model('User', userSchema);