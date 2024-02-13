const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    battlenetId: { type: String, required: true },
    battletag: { type: String, required: true },
    provider: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    mytasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MyTasks' }],
    clantasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClanTasks' }],
    myfixedtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FixedTasks' }],
});

module.exports = mongoose.model('User', userSchema);