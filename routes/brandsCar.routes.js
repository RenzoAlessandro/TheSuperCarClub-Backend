const express = require('express');
const router = express.Router();
const brandCarsController = require('../controllers/brandsCar.controller');

// Definimos ruta para obtener todos las marcas (GET)
router.get('/brands/:idBrand?', brandCarsController.getBrands);

// Exportamos router para poder usar rutas en app.js
module.exports = router;