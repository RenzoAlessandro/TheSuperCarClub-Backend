const express = require('express');
const router = express.Router();

const typeCarController = require('../controllers/typesCar.controller');

router.get('/types/:idTypeCar?', typeCarController.getTypeCars);

module.exports = router;