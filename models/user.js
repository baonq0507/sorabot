const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    discordId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 100000 },
    job: { type: String, default: 'none' },
    jobTime: { type: Number, default: 0 },
    lastTaskTime: { type: Date, default: new Date(Date.now() - 31 * 60 * 1000) },
    displayName: { type: String, default: '' },
    fishingRod: { type: String, default: 'none' },
    lastFishTime: { type: Date, default: new Date(Date.now() - (31 * 60 - 5) * 1000) },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);