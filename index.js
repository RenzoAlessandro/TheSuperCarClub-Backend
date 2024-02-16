const app = require('./app')
const mongoose = require('mongoose');
const port = 3001

// Conexion a la base de datos MongoDB
async function main(){
    try{
        // Nos conectamos a la base de datos
        await mongoose.connect('mongodb+srv://renzosucari:sgQ0VmXsMi5q8wVT@cluster-thesupercarclub.kfitmpe.mongodb.net/TheSuperCarClub')
        console.log('CONEXION A LA DB CORRECTA - THE SUPER CAR CLUB')
        // ponemos nuestro servidor express a escuchar
        app.listen(port, () => {
            console.log(`El server esta corriendo en el puento ${port}`)
        })

    } catch(error){
        console.log(error)
    }
}

main()