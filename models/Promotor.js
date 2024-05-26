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
        default: false, 
    },
    top_filter: { 
        type: String, 
        required: false, 
    },
    is_big: { 
        type: Boolean, 
        default: false, 
    },
    is_accepted: { 
        type: Boolean, 
        default: false, 
    },
    message: { 
        type: String, 
        required: false, 
    },
    tier: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
    },
});

module.exports = mongoose.model('Promotor', PromotorSchema);
