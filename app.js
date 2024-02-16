const express = require('express')
const cors = require('cors')
const app = express()


const userRoutes = require('./routes/user.routes');
const modelCarRoutes = require('./routes/modelCar.routes');
const brandCarRoutes = require('./routes/brandsCar.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const typesCarRoutes = require('./routes/typesCar.routes');

//Middlewares
// Para poder leer un body
app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(modelCarRoutes);
app.use(brandCarRoutes);
app.use(testimonialsRoutes);
app.use(typesCarRoutes);


module.exports = app;