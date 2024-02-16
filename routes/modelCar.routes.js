const express = require('express');

// Inicializamos el objeto router para poder definir rutas
const router = express.Router();

const jwtVeryfy = require('../middlewares/isAuth')

const modelCarController = require('../controllers/modelCar.controller');


// Definimos ruta para obtener todos los modelos de autos (GET)
router.get('/modelcars/:idModelCar?', modelCarController.getModelCars);

// Agregamos un nuevo modelo de auto (POST)
router.post('/modelcars', modelCarController.createModelCar);

// Borrar un modelo de auto (DELETE)
router.delete('/modelcars/:idModelCar', jwtVeryfy, modelCarController.deleteModelCar);

// Actualizar un modelo de auto (PUT)
router.put('/modelcars/:idModelCar', modelCarController.updateModelCar);


// Exportamos router para poder usar rutas en app.js
module.exports = router;