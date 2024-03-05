const Brand = require('../models/brandCar.model');

// OBTENER LAS MARCAS
async function getBrands(req, res){
    try {
        const id = req.params.idBrand;

        if(id){
            const brand = await Brand.findById(id, {__v:0});

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

        const brands = await Brand.find().select({__v:0});

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
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

async function postBrands(req, res){
    try {
        const brand = new Brand(req.body);
        const brandSaved = await brand.save();

        return res.status(201).send({
            brand: brandSaved,
            ok: true,
            message: "Marca creado correctamente"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error de servidor"
        })
    }
}

module.exports = {
    getBrands,
    postBrands
}