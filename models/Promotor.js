//promotor model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//user schema
const PromotorSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
    },
    location: { 
        type: String, 
        required: true, 
    },
});

module.exports = mongoose.model('Promotor', PromotorSchema);
