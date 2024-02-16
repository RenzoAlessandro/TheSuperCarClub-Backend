const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
    testimonial:{
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 100,
        trim: true,
    },

    date:{
        type: String, 
        required: true,
        minlength: 8,
        maxlength: 30,
        trim: true,
    },

    user:{
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
    }
})

module.exports = mongoose.model('usertestimonials', testimonialSchema);