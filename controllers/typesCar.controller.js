const TypeCar = require('../models/typeCar.model');

async function getTypeCars(req, res){
    try {

        const id = req.params.idTypeCar;

        if(id){
            const typeCar = await TypeCar.findById(id);

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

        const typesCar = await TypeCar.find();

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

module.exports = {
    getTypeCars
}