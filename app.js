const express = require('express')
const cors = require('cors')
const app = express()


const userRoutes = require('./routes/user.routes');
const modelCarRoutes = require('./routes/modelCar.routes');
const brandCarRoutes = require('./routes/brandsCar.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const typesCarRoutes = require('./routes/typesCar.routes');
const transmissionRoutes = require('./routes/transmission.routes');
const fuelRoutes = require('./routes/fuel.routes');
const locationRoutes = require('./routes/location.routes');
const orderRoutes = require('./routes/order.routes');

//Middlewares
// Para poder leer un body
app.use(express.json());

// Compartir la carpeta public
app.use(express.static('public'));

app.use(cors());

app.use([
    userRoutes, 
    modelCarRoutes, 
    brandCarRoutes, 
    testimonialsRoutes, 
    typesCarRoutes, 
    transmissionRoutes,
    fuelRoutes,
    locationRoutes,
    orderRoutes
    ])


module.exports = app;