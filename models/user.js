const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    discordId: { type: String, required: true, unique: true },
    balance: { type: Number, default: 10000 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);