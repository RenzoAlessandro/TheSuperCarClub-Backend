const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelCarSchema = new Schema({
    brand:{
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },

    model:{
        type: String, 
        required: true,
        unique  : true,
        minlength: 4,
        maxlength: 30,
        trim: true
    },

    engine:{
        type: String, 
        required: true,
        minlength: 4,
        maxlength: 20,
        trim: true
    },

    type:{
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },

    transmission:{
        type: String, 
        required: false,
        minlength: 4,
        maxlength: 12,
        trim: true,
        default: 'Automático',
    },

    fuel:{
        type: String, 
        required: false,
        minlength: 4,
        maxlength: 10,
        trim: true,
        default: 'Gasolina',
    },

    maxSpeed:{
        type: Number,
        required: true,
        min: 100,
        max: 600,
        default: 101,
    },

    horsePowerHP:{
        type: Number,
        required: true,
        min: 100,
        max: 1500,
        default: 200,
    },

    de0a60MPH:{
        type: Number,
        required: true,
        min: 0.0,
        max: 10.0,
        default: 0.0,
    },

    seats:{
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 4,
    },

    year:{
        type: Date,
        required: false,
    },

    color:{
        type: String,
        minlength: 3,
        maxlength: 8,
        trim: true,
        default: '#FFFFFF'
    },

    ratingCount:{
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },

    price24h:{
        type: Number,
        required: true,
        min: 100,
        max: 1500,
        default: 850,
        required: false
    },

    carImage:{
        type: String,
        required: false,
        trim: true,
        default: 'https://banner2.cleanpng.com/20190425/pv/kisspng-car-portable-network-graphics-computer-icons-vecto-sedan-car-model-svg-png-icon-free-download-1-7-9-5cc26021e6e465.3158713415562424659457.jpg',
    },

    description:{
        type: String,
        maxlength: 20000,
        trim: true,
        default: 'Sin descripción.',
    },

    active:{
        type: Boolean,
        required: false,
        default: false,
    },

    featured:{
        type: Boolean,
        required: false,
        default: false,
    }
})

module.exports = mongoose.model('modelCar', modelCarSchema)