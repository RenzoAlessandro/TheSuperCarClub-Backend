const Fuel = require('../models/fuel.model')

async function getFuels(req, res){
    try {
        const id = req.params.idFuel;

        if(id){
            const fuel = await Fuel.findById(id, {__v:0});

            if(!fuel){
                return res.status(404 ).send({
                    ok: false,
                    message: 'No se encontro el fuel'
                })
            }

            return res.send({
                fuel,
                ok: true,
                message: 'Se encontro el fuel'
            });
        }

        const fuels = await Fuel.find().select({__v:0});

        if(!fuels.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron fuels"
            })
        }

        res.send({
            fuels,
            ok: true,
            message: 'Fuels obtenidos correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

async function postFuels(req, res){
    try {
        const fuel = new Fuel(req.body);
        const fuelSaved = await fuel.save();

        return res.status(201).send({
            fuel: fuelSaved,
            ok: true,
            message: "Fuel creado correctamente"
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
    getFuels,
    postFuels
}