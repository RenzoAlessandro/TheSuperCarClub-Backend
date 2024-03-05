const express = require('express');
// Inicializamos el objeto router para poder definir rutas
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const userController = require('../controllers/user.controller');
const uploadImage = require('../middlewares/uploadUserImage')

// Definimos ruta para obtener todos los usuarios GET
router.get('/users/:idUser?', userController.getUsers);

// Agregamos un nuevo usuario POST (NO VERIFICAMOS NI TOKEN NI ROL PARA PERMITIR EL REGISTO DE USUARIOS POR PRIMERA VEZ)
router.post('/users', [ uploadImage ], userController.createUser);

// Borrar un usuario DELETE
router.delete('/users/:idUser', [jwtVerify, isAdmin], userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users/:idUser', [jwtVerify, isAdmin, uploadImage], userController.updateUser);

// Busqueda de usuario
router.get('/users/search/:search', userController.searchUser);

// Login POST
router.post('/login', userController.login);



module.exports = router