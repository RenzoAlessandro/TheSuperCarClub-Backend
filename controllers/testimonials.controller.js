const Testimonial = require('../models/testimonial.model');

async function getTestimonials(req, res){
    try {
        const id = req.params.idtestimonial;

        if(id){
            const testimonial = await Testimonial.findById(id);

            if(!testimonial){
                return res.status(404).send({
                    ok: false,
                    message: 'No se encontro el testimonio'
                })
            }

            return res.send({
                testimonial,
                ok: true,
                message: 'Se encontro el testimonio'
            });
        }

        const testimonials = await Testimonial.find();

        if(!testimonials.length){
            return res.status(404).send({
                ok: false,
                message: "No se encontraron testimonios"
            })
        }

        res.send({
            testimonials,
            message: 'Testimonios obtenidos correctamente',
            ok: true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: 'Error al obtener testimonios'
        })
    }
}

module.exports = {
    getTestimonials
}