const express = require('express');
const router = express.Router();
const transmissionsController = require('../controllers/transmission.controller');

router.get('/transmissions/:idTransmission?', transmissionsController.getTransmissions);

router.post('/transmissions', transmissionsController.postTransmissions);

module.exports = router