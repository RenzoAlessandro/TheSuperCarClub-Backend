const Brand = require('../models/brandCar.model');

// OBTENER LAS MARCAS
async function getBrands(req, res){
    try {
        const id = req.params.idBrand;

        if(id){
            const brand = await Brand.findById(id);

            if(!brand){
                return res.status(404 ).send({
                    ok: false,
                    message: 'No se encontro la marca'
                })
            }

            return res.send({
                brand,
                ok: true,
                message: 'Se encontro la marca'
            });
        }

        const brands = await Brand.find();

        if(!brands.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron marcas"
            })
        }

        res.send({
            brands,
            ok: true,
            message: 'Marcas obtenidos correctamente'
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getBrands
}