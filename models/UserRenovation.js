// userRenovationData.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRenovationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    renovation: { type: Schema.Types.ObjectId, ref: 'Renovation', required: true },
    renovation_title: { type: String, required: true },
    budget: { type: Number, default: 0 },
    budget_final: { type: Number, default: 0},
    status: { type: String, default: 'Aanbevolen' },
    saved: { type: Boolean, default: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    amount_total: { type: Number, required: false },
    amount_done: { type: Number, required: false },
    notes: { type: String, required: false },
    checklist: { type: Array, required: false },
});

const UserRenovation = mongoose.model('UserRenovation', UserRenovationSchema);

module.exports = UserRenovation;
