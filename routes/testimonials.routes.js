const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials.controller');

// Definimos ruta para obtener todos los testimonios de los clientes (GET)
router.get('/testimonials/:idtestimonial?', testimonialsController.getTestimonials);

module.exports = router;