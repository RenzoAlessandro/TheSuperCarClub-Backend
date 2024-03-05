const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/location.controller');

// Definimos ruta para obtener todos las marcas (GET)
router.get('/locations/:idLocation?', locationsController.getLocations);

router.post('/locations', locationsController.postLocations);

// Exportamos router para poder usar rutas en app.js
module.exports = router;