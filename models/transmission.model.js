const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelTransmission = new Schema({
    transmission: {
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 25,
        trim: true,
    },
    abbreviation: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 9,
        trim: true,
    },
    description:{
        type: String,
        required: false,
        maxlength: 20000,
        trim: true,
    }
})

module.exports = mongoose.model('transmission', modelTransmission)