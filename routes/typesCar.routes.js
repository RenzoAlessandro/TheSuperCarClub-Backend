const express = require('express');
const router = express.Router();

const typeCarController = require('../controllers/typesCar.controller');

router.get('/types/:idTypeCar?', typeCarController.getTypeCars);

router.post('/types', typeCarController.postTypeCars);

module.exports = router;