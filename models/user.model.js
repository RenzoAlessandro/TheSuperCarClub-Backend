const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Regex
const regexText = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/
const regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/


const userSchema = new Schema({
    firstName:{
        type: String,
        require: true,
        minlength: 4,
        maxlength: 60,
        trim: true,
        validate: {
            validator: function(firstName){
                return regexText.test(firstName);
            },
            message: props => `${props.firstName} no es un nombre valido`
        }
    },

    lastName:{
        type: String,
        require: true,
        minlength: 4,
        maxlength: 60,
        trim: true,
        validate: {
            validator: function(lastName){
                return regexText.test(lastName);
            },
            message: props => `${props.lastName} no es un nombre valido`
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        maxlength: 80,
        validate: {
            validator: function(email){
                return regexEmail.test(email)
            },
            message: props => `${props.email} no es un correo valido`
        }
    },

    password:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 65,
        trim: true
    },

    location:{
        type: String,
        require: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
    },

    age:{
        type: Number,
        required: true,
        min: 12,
        max: 120
    },

    userImage:{
        type: String,
        required: false,
        trim: true,
        default: 'https://raw.githubusercontent.com/RenzoAlessandro/TheSuperCarClub-Assets/main/others/profile-picture.webp',
    },

    active:{
        type: Boolean,
        required: false,
        default: true,
    },

    role: {
        type: String,
        require: false,
        default: 'USER_ROLE',
        enum: [
            'USER_ROLE',
            'CLIENT_ROLE',
            'ADMIN_ROLE'
        ]
    },
})

module.exports = mongoose.model('users', userSchema)