const mongoose = require('mongoose');

const SugarLogSchema = new mongoose.Schema({
    userId: { type: String, required: true, default: 'demo-user' }, // strict auth not implemented yet
    date: { type: Date, default: Date.now },
    beforeLevel: { type: Number, required: true }, // mg/dL
    afterLevel: { type: Number, required: true }, // mg/dL
    status: { type: String, enum: ['Stable', 'Elevated', 'Low'], default: 'Stable' },
    notes: String
});

module.exports = mongoose.model('SugarLog', SugarLogSchema);
