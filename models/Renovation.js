// renovation.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RenovationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimated_cost: { type: String, required: true },
    cost: { type: String, required: true },
    impact: { type: String, required: true },
    grants: { type: Array, required: true },
    startup_info: { type: String, required: true },
    type: { type: String, required: true },
});

const Renovation = mongoose.model('Renovation', RenovationSchema);

module.exports = Renovation;