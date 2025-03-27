const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true },
    mac: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: 'offline' },
    lastUpdated: { type: Date, default: Date.now },
    speed: { type: Number, default: 0 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);
