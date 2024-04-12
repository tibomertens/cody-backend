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
        required: false, 
    },
    address: { 
        type: String, 
        required: false, 
    },
    rating: { 
        type: String, 
        required: true, 
    },
    logo: { 
        type: String, 
        required: false, 
    },
    website_url: { 
        type: String, 
        required: false, 
    },
});

module.exports = mongoose.model('Promotor', PromotorSchema);
