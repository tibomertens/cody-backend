//users model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//user schema
const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
    },
    admin: { 
        type: Boolean, 
        default: false 
    },
});

module.exports = mongoose.model('User', UserSchema);
