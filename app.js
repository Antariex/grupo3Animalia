// Requieres
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override'); // para poder usar los métodos PUT y DELETE

// Express
const app = express();

//Middlewares - Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public'))) // Necesario para los archivos estaticos en el folder /public
app.use(express.urlencoded({ extended: false })); //va con llaves adentro lo modifique Y lo habilite
app.use(logger('dev'));//
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); //para poder pisar el method="POST" en el formulario por PUT y DELETE


// Motor de vistas
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views")); define la ubicación de la carpeta de las vistas NO ESTA AGREGADA AL CODIGO TODAVIA

//Servidor levantado en puerto 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
});

// Rutas requirer y USE
const mainRouter = require('./routes/mainRouter'); // rutas main
const userRouter = require('./routes/userRouter'); // rutas user
const productRouter = require('./routes/productRouter'); //rutas product

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

//404


/*app.get("*", (req, res) => {
    res.render(path.join(__dirname, "./views/404.ejs"));
});*/

// Exportar app
module.exports = app;