const Transmission = require('../models/transmission.model')

async function getTransmissions(req, res){
    try {
        const id = req.params.idTransmission;

        if(id){
            const transmission = await Transmission.findById(id, {__v:0});

            if(!transmission){
                return res.status(404 ).send({
                    ok: false,
                    message: 'No se encontro la transmission'
                })
            }

            return res.send({
                transmission,
                ok: true,
                message: 'Se encontro la transmission'
            });
        }

        const transmissions = await Transmission.find().select({__v:0});

        if(!transmissions.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron transmissions"
            })
        }

        res.send({
            transmissions,
            ok: true,
            message: 'transmissions obtenidos correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

async function postTransmissions(req, res){
    try {
        const transmission = new Transmission(req.body);
        const transmissionSaved = await transmission.save();

        return res.status(201).send({
            transmission: transmissionSaved,
            ok: true,
            message: "Transmission creado correctamente"
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
    getTransmissions,
    postTransmissions
}