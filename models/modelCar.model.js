const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelCarSchema = new Schema({
    brand:{
        type: Schema.Types.ObjectId,
        ref: "brandcars",
        require: true
    },

    model:{
        type: String, 
        required: true,
        unique  : true,
        minlength: 2,
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
        type: Schema.Types.ObjectId,
        ref: "typecars",
        required: true
    },

    transmission:{
        type: Schema.Types.ObjectId,
        ref: "transmission",
        required: true
    },

    fuel:{
        type: Schema.Types.ObjectId,
        ref: "fuel",
        required: true
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
        max: 2000,
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
        trim: true
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
    },

    createdAt: {
        type: Date,
        default: Date.now // Sin los parentesis como en JS
    }
})

module.exports = mongoose.model('modelCar', modelCarSchema)