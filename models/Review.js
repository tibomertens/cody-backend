const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    promotorId: { type: Schema.Types.ObjectId, ref: 'Promotor', required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    is_reported: { type: Boolean, default: false }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;