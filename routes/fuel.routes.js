const express = require('express');
const router = express.Router();
const fuelsController = require('../controllers/fuel.controller');

router.get('/fuels/:idFuel?', fuelsController.getFuels);

router.post('/fuels', fuelsController.postFuels);

module.exports = router;