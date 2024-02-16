const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandCarSchema = new Schema({
    brand:{
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true
    },

    headquarters:{
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 15,
        trim: true
    },

    isoTipo:{
        type: String, 
        required: true,
        trim: true
    },

    logoTipo:{
        type: String, 
        required: true,
        trim: true
    },

    imagoTipo:{
        type: String,
        required: true, 
        trim: true
    }
})

module.exports = mongoose.model('Brandcars', brandCarSchema)