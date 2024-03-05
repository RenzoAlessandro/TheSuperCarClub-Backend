const jwt = require('jsonwebtoken');
const secret = 'R3nz0@Al3ss4ndr0';

function jwtVerify(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).send({
            ok: false,
            message: "No se proporcionó un token"
        })
    }

    jwt.verify(token, secret,  (error, payload) => {
        // El token es incorrecto, tiene un error entonces nosotros deberiamos 
        // cortar la request/peticion y devolver una respuesta o mensaje de error.
        if(error){
            return res.status(401).send({
                ok: false,
                message: "No tienes autorización"
            })
        }

        // El token sea correcto entonces vamos a continuar con la ejecución de la 
        // peticion y agregar el playload a la request.
        req.user = payload.user;

        // Continuamos hacia el controlador(funcion) correspondiente
        next();
    })
}


module.exports = jwtVerify;