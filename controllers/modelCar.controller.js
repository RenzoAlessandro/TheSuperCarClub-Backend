const ModelCar = require('../models/modelCar.model');

// OBTENER LOS MODELO DE AUTOS / AUTO
async function getModelCars(req, res){
    try {
        const id = req.params.idModelCar;

        if(id){
            const modelCar = await ModelCar.findById(id, {__v: 0}).populate("brand").populate("type").populate("transmission").populate("fuel");

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

        const total = await ModelCar.countDocuments();

        const limit = parseInt(req.query.limit) || total;
        const page = parseInt(req.query.page) || 0;

        // En caso tengamos varios await podemos lanzarlos como threads al mismo tiempo
        const [modelCars] = await Promise.all([
            ModelCar.find()
                    .populate("brand")
                    .populate("type")
                    .populate("transmission")
                    .populate("fuel")
                    .limit(limit)
                    .skip(page * limit)
                    .collation({locale: 'es'})
                    .sort({model:1})
                    .select({__v: 0})
        ])

        if(!modelCars.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron modelos de autos"
            })
        }

        res.send({
            modelCars,
            total,
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

        if(req.file?.filename){
            modelCar.carImage = req.file.filename
        }


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
        const id = req.params.idModelCar;
        const modelCarDeleted = await ModelCar.findByIdAndDelete(id);

        if(!modelCarDeleted){
            return res.status(404).send({
                ok: false,
                message: "Modelo de vehículo no encontrado"
            })
        }

        res.status(200).send({
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

        if(req.file?.filename){
            nuevosValores.carImage = req.file.filename
        }

        const modelCarExist = await ModelCar.findById(id);
        if(!modelCarExist){
            return res.status(404).send({
                ok: false,
                message: "Modelo de vehículo no encontrado"
            })
        }

        const modelCarUptade = await ModelCar.findByIdAndUpdate(id, nuevosValores, {new: true});

        res.status(200).send({
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


async function searchModelCar(req, res){
    try {
        const search = new RegExp(req.params.search, 'i');
        
        const modelCars = await ModelCar.find({
            $or:[
                {model: search }  
            ]
        }).populate("brand")
        .populate("type")
        .populate("transmission")
        .populate("fuel")
        .select({__v: 0})

        res.status(200).send({
            modelCars,
            ok: true,
            message: "Vehículos encontrados",
        })


    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: "No se pudo buscar el vehículo"
        })
    }
}

module.exports ={
    getModelCars,
    createModelCar,
    deleteModelCar,
    updateModelCar,
    searchModelCar
}