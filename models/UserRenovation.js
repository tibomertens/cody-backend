// userRenovationData.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRenovationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    renovation: { type: Schema.Types.ObjectId, ref: 'Renovation', required: true },
    renovation_title: { type: String, required: true },
    budget: { type: Number, default: 0 },
    status: { type: String, default: 'Aanbevolen' },
    saved: { type: Boolean, default: false },
    startDate: { type: Date, required: false, default: null },
    endDate: { type: Date, required: false, default: null },
    amount_total: { type: Number, required: false, default: null },
    amount_done: { type: Number, required: false, default: null },
    notes: { type: String, required: false, default: null },
    checklist: { type: Array, required: false, default: null },
});

const UserRenovation = mongoose.model('UserRenovation', UserRenovationSchema);

module.exports = UserRenovation;
