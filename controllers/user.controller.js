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
            const user = await User.findById(id, {password: 0, __v:0}).populate("location");
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

        const limit = parseInt(req.query.limit) || 7;
        const page = parseInt(req.query.page) || 0;

        // Traer todos los usuarios
        // En caso tengamos varios await podemos lanzarlos como threads al mismo tiempo
        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find()
                .populate("location")
                .limit(limit)
                .skip(page * limit)
                .collation({locale: 'es'})
                .sort({firstName:1})
                .select({ password: 0, __v:0})
        ])

        if(!users.length){
            return res.status(404).send({
                ok: false,
                message: 'No se encontraron usuarios'
            })
        }
        return res.send({
            users,
            total,
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

        if(req.file?.filename){
            user.userImage = req.file.filename
        }

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
        const id = req.params.idUser;
        const userDeleted = await User.findByIdAndDelete(id);

        if(!userDeleted){
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            })
        }

        res.status(200).send({
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

        if(req.file?.filename){
            nuevosValores.userImage = req.file.filename
        }

        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            })
        }

        const userUpdated = await User.findByIdAndUpdate(id, nuevosValores, {new: true});

        res.status(200).send({
            user: userUpdated,
            ok: true,
            message: "El usuario fue actualizado correctamente",
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: "El usuario no se pudo actualizar"
        })
    }
}

async function searchUser(req, res){
    try {
        const search = new RegExp(req.params.search, 'i');
        
        const users = await User.find({
            $or:[
                {firstName: search },
                {email: search }
            ]
        }).populate("location").select({ password: 0, __v:0})

        res.status(200).send({
            users,
            ok: true,
            message: "Usuarios encontrados",
        })


    } catch (error) {
        console.log(error);
        res.send({
            ok: false,
            message: "No se pudo buscar el usuario"
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

        const user = await User.findOne({email: email.toLowerCase()}).populate("location");;
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
    searchUser,
    login
}