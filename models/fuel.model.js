const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelFuel = new Schema({
    fuel:{
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 10,
        trim: true,
        default: 'Gasolina',
    },
    description:{
        type: String,
        required: false,
        maxlength: 20000,
        trim: true,
    },
})

module.exports = mongoose.model('fuel', modelFuel)