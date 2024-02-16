const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeCarSchema = new Schema({
    type:{
        type: String, 
        required: false,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },

    typeImage:{
        type: String, 
        required: false,
        trim: true,
        minlength: 5,
        maxlength: 200,
    }
})

module.exports = mongoose.model('typecars', typeCarSchema);