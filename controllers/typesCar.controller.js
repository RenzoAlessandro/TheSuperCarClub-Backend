const TypeCar = require('../models/typeCar.model');

async function getTypeCars(req, res){
    try {

        const id = req.params.idTypeCar;

        if(id){
            const typeCar = await TypeCar.findById(id, {__v:0});

            if(!typeCar){
                return res.status(404).send({
                    ok: false,
                    message: 'No se encontro el tipo de vehículo'
                })
            }
            return res.send({
                typeCar,
                ok: true,
                message: 'Se encontro el tipo de vehículo'
            });
        }

        const typesCar = await TypeCar.find().select({__v:0});

        if(!typesCar.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron tipos de vehículo"
            })
        }

        res.send({
            typesCar,
            message: 'Tipos de vehículo obtenidos correctamente',
            ok: true
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener tipos de vehículos'
        })
    }
}

async function postTypeCars(req, res){
    try {
        const typeCar = new TypeCar(res.body);
        const typeCarSaved = await typeCar.save();

        return res.status(201).send({
            typeCar: typeCarSaved,
            ok: true,
            message: "Tipo de vehículo creado correctamente"
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
    getTypeCars,
    postTypeCars
}