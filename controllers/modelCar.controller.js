const ModelCar = require('../models/modelCar.model');

// OBTENER LOS MODELO DE AUTOS / AUTO
async function getModelCars(req, res){
    try {
        const id = req.params.idModelCar;

        if(id){
            const modelCar = await ModelCar.findById(id);

            if(!modelCar){
                return res.status(404 ).send({
                    ok: false,
                    message: 'No se encontro el modelo de auto'
                })
            }

            return res.send({
                modelCar,
                ok: true,
                message: 'Se encontro el modelo de auto'
            });
        }

        const modelCars = await ModelCar.find();

        if(!modelCars.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron modelos de autos"
            })
        }

        res.send({
            modelCars,
            ok: true,
            message: 'Modelos de autos obtenidos correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener los modelos de autos'
        })
    }
}

// CREAR UN MODELO DE AUTO
async function createModelCar(req, res){
    try {
        const modelCar = new ModelCar(req.body);
        console.log(modelCar);
        const ModelCarSaved = await modelCar.save();
        
        res.status(201).send({
            modelCar: ModelCarSaved,
            ok: true,
            message: "Modelo de auto creado correctamente"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'No se pudo crear el modelo de auto'
        })
    }
}

// BORRAR MODELO DE AUTO
async function deleteModelCar(req, res){
    try {

        console.log(req.user);

        if(req.user.role !== 'ADMIN_ROLE'){
            return res.status(401).send({
                ok: false,
                message: "No tiene permisos para realizar esta acción"
            })
        }

        const id = req.params.idModelCar;
        const modelCarDeleted = await ModelCar.findByIdAndDelete(id);

        res.send({
            modelCar: modelCarDeleted,
            ok: true,
            message: "Modelo de auto borrado correctamente"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'No se pudo borrar el modelo de auto'
        })
    }
}

// ACUTALIZAR MODELO DE AUTO
async function updateModelCar(req, res){
    try {
        const id = req.params.idModelCar;
        const nuevosValores = req.body;
        const modelCarUptade = await ModelCar.findByIdAndUpdate(id, nuevosValores, {new: true});

        res.send({
            modelCar: modelCarUptade,
            ok: true,
            message: "El Modelo de auto fue actualizado"
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: "El Modelo de auto no se pudo actualizar"
        })
    }
}


module.exports ={
    getModelCars,
    createModelCar,
    deleteModelCar,
    updateModelCar
}