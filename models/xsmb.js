const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const XsmbSchema = new Schema({
    number: { type: String, required: true },
    time: { type: Date, required: true },
    users: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Xsmb', XsmbSchema);


