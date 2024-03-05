const express = require('express');
// Inicializamos el objeto router para poder definir rutas
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const modelCarController = require('../controllers/modelCar.controller');
const uploadImageModelCar = require('../middlewares/uploadModelCarImage');

// Definimos ruta para obtener todos los modelos de autos (GET)
router.get('/modelcars/:idModelCar?', modelCarController.getModelCars);

// Agregamos un nuevo modelo de auto (POST)
router.post('/modelcars', [jwtVerify, isAdmin, uploadImageModelCar], modelCarController.createModelCar);

// Borrar un modelo de auto (DELETE)
router.delete('/modelcars/:idModelCar', [jwtVerify, isAdmin], modelCarController.deleteModelCar);

// Actualizar un modelo de auto (PUT)
router.put('/modelcars/:idModelCar', [jwtVerify, isAdmin, uploadImageModelCar], modelCarController.updateModelCar);

// Busqueda de usuario
router.get('/modelcars/search/:search', modelCarController.searchModelCar);

// Exportamos router para poder usar rutas en app.js
module.exports = router;