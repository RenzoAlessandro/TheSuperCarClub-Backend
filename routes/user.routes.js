const express = require('express');
// Inicializamos el objeto router para poder definir rutas
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth')
const userController = require('../controllers/user.controller');


// Definimos ruta para obtener todos los usuarios GET
router.get('/users/:idUser?', userController.getUsers);

// Agregamos un nuevo usuario POST
router.post('/users', userController.createUser);

// Borrar un usuario DELETE
router.delete('/users/:idUser', jwtVerify, userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users/:idUser', userController.updateUser);

// Login POST
router.post('/login', userController.login);



module.exports = router