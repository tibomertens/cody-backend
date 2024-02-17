//require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const User = require('./User');

const RenovationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimated_cost: { type: String, required: true },
    priority: { type: String, required: true },
    grants: { type: String, required: true },
    startup_info: { type: Text, required: true },
    // Add fields for user-specific data
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
    // budget: { type: Number }, 
    // start_date: { type: Date }, 
    // status: { type: String, default: "Suggestie" }, 
    // progress_now: { type: Number }, 
    // progress_total: { type: Number },
    // notes: { type: String },
    // checkList: { type: Array },
});

module.exports = mongoose.model("renovations", RenovationSchema);