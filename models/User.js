const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchemas = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [Schema.Types.Object],
        ref: 'Recipe'
    }

});


module.exports = mongoose.model('User', UserSchemas);