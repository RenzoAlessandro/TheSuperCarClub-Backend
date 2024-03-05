const Location = require('../models/location.model');

async function getLocations(req, res){
    try {
        const id = req.params.idLocation;

        if(id){
            const location = await Location.findById(id, {__v:0});

            if(!location){
                return res.status(404 ).send({
                    ok: false,
                    message: 'No se encontro la ubicación'
                })
            }

            return res.send({
                location,
                ok: true,
                message: 'Se encontro la ubicación'
            });
        }

        const locations = await Location.find().select({__v:0});

        if(!locations.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron ubicaciones"
            })
        }

        res.send({
            locations,
            ok: true,
            message: 'Ubicaciones obtenidos correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

async function postLocations(req, res){
    try {
        const location = new Location(req.body);
        const locationSaved = await location.save();

        return res.status(201).send({
            location: locationSaved,
            ok: true,
            message: "Ubicación creado correctamente"
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
    getLocations,
    postLocations
}