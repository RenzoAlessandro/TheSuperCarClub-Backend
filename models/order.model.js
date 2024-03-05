const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    totalPrice: {
        type: Number,
        require: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'modelCar',
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            price:{
                type: Number,
                require: true
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['PENDIENTE', 'APROBADO', 'CANCELADO'],
        default: 'PENDIENTE'
    }
})

module.exports = mongoose.model('orders', orderSchema)