const Order = require('../models/order.model')

async function getOrders(req, res){
    try {
        if(req.user.role === 'ADMIN_ROLE'){
            const orders = await Order.find().populate('userId').populate('products.productId');
            return res.send({
                orders,
                ok: true,
                message: 'Orders obtenidos correctamente'
            })
        }

        const orders = await Order.find({userId: req.user._id}).populate('products.productId');

        return res.send({
            orders,
            ok: true,
            message: 'Orders obtenidos correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

async function createOrder(req, res){
    try {
        const order = new Order(req.body);
        const orderSaved = await order.save();

        return res.status(201).send({
            order: orderSaved,
            ok: true,
            message: "Order creado correctamente"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

module.exports = {
    getOrders,
    createOrder
}