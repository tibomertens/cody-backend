// userRenovationData.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRenovationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    renovation: { type: Schema.Types.ObjectId, ref: 'Renovation', required: true },
    budget: { type: Number, default: 0 },
    status: { type: String, default: 'aanbevolen' },
});

const UserRenovation = mongoose.model('UserRenovation', UserRenovationSchema);

module.exports = UserRenovation;
