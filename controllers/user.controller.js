// PARAMETRO: Si o si se deve enviar el parametro o parametros y en orden como en el router se define
// Ruta: http://localhost:3000/users/65a46a2929e7230f1079bb96
// Se accede a ella "req.params"

// QUERYPARAMETRO: Son completamente independientes, se puede obviar uno o varios.
// Ruta: http://localhost:3000/users?id=isDelUsuario
// Accedemos a ella "req.query"


const User = require('../models/user.model');

// Para hashear la contraseña
const bcrypt = require('bcrypt');
const salRounds = 10;

// Para usar tokens
const jwt = require('jsonwebtoken');
const secret = 'R3nz0@Al3ss4ndr0';

// OBTENER USUARIO/USUARIOS (GET)
async function getUsers(req, res){
    try {
        // Traer un solo usuario
        const id = req.params.idUser;
        if(id){
            const user = await User.findById(id, {password: 0});
            if(!user){
                return res.status(404).send({
                    ok: false,
                    message: 'No se encontro el usuario'
                })
            }
            return res.send({
                user,
                ok: true,
                message: 'Usuario obtenido correctamente'
            })
        }

        // Traer todos los usuarios
        const users = await User.find();
        if(!users.length){
            return res.status(404).send({
                ok: false,
                message: 'No se encontraron usuarios'
            })
        }
        return res.send({
            users,
            ok: true,
            message: 'Usuarios obtenidos correctamente'
        })

    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: 'Error al obtener usuarios'
        })
    }
}

// CREAR USUARIO (POST)
async function createUser(req, res){
    try {
        const user = new User(req.body);
        // Encriptar contraseña con bcrypt
        user.password = await bcrypt.hash(user.password, salRounds);
        console.log(user);
        const userSaved = await user.save();
        // Borramos la contraseña
        userSaved.password = undefined;

        return res.send({
            user: userSaved,
            ok: true,
            message: 'Usuario creado correctamente'
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'No se pudo crear el usuario'
        })
    }

}

// ELIMINAR USUARIO (DEL)
async function deleteUser(req, res){
    try {
        console.log(req.user);

        //Chekeo su el role del usuario NO ES ADMIN, no lo dejo continuar
        if(req.user.role !== 'ADMIN_ROLE'){
            return res.status(401).send({
                ok: false,
                message: "No tiene permisos para realizar esta acción"
            })
        }

        const id = req.params.idUser;
        const userDeleted = await User.findByIdAndDelete(id);

        res.send({
            user: userDeleted,
            ok: true,
            message: "Usuario borrado correctamente"
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'No se pudo borrar el usuario'
        })
    }
}

// ACTUALIZAR USUARIO (PUT)
async function updateUser(req, res){
    try {
        const id = req.params.idUser;
        const nuevosValores = req.body;
        const userUpdated = await User.findByIdAndUpdate(id, nuevosValores, {new: true});

        res.send({
            user: userUpdated,
            ok: true,
            message: "El usuario fue actualizado",
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: "El usuario no se pudo actualizar"
        })
    }
}

// LOGIN (POST)
async function login(req, res){
    try {
        const {email, password} = req.body;
        // Faltan datos como email o contraseña
        if(!password || !email){
            return res.status(400).send({
                ok: false,
                message: "Faltan datos"
            })
        }

        const user = await User.findOne({email: email.toLowerCase()});
        // Si no existe el usuario
        if(!user){
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            })
        }
        // Si existe el usuario, comprobamos la contraseña
        const comparePassword = await bcrypt.compare(password, user?.password);
        if(!comparePassword){
            return res.status(404).send({
                ok: false,
                message: "Datos incorrectos"
            })
        }
        user.password = undefined;

        // Generamos un token para el usuario de tal modo que sus datos originales
        // no pueden ser manipulados
        const token = jwt.sign({user}, secret, {expiresIn: '1h'});

        res.send({
            user,
            token,
            ok: true,
            message: "Login correcto",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "No se pudo hace el login"
        })
    }

}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    login
}