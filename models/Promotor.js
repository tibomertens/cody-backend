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
        required: false, 
    },
    logo: { 
        type: String, 
        required: false, 
    },
    website_url: { 
        type: String, 
        required: false, 
    },
    is_top: { 
        type: Boolean, 
        required: false, 
    },
    top_filter: { 
        type: String, 
        required: false, 
    },
    is_big: { 
        type: Boolean, 
        required: false, 
    },
});

module.exports = mongoose.model('Promotor', PromotorSchema);
