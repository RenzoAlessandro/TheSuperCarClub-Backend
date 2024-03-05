const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelLocation = new Schema({
    location: {
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true,
    },

    country: {
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true,
    }
})

module.exports = mongoose.model('location', modelLocation)