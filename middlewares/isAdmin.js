function isAdmin(req, res, next){

    //Chekeo su el role del usuario NO ES ADMIN, no lo dejo continuar
    if(req.user.role !== 'ADMIN_ROLE'){
        return res.status(403).send({
            ok: false,
            message: "No tiene permisos para realizar esta acción"
        })
    }

    next();
}

module.exports = isAdmin;