const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mainRouter = require('./routes/index')

// Express
const app = express();

//Servidor escuchando en el puerto 3000 && Compatibilidad para Heroku
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
    console.log('http://localhost:3000')
});

//Middlewares - Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')))

//Procesamiento de formularios
app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride('_method'));
app.use(express.json());

//Gestion de session && almacenamiento cookies
app.use(cookieParser());

// Motor de vistas
app.set("view engine", "ejs");


//Enrutador principal (http://localhost:3000/)
app.use(mainRouter);

// Exportar app
module.exports = app;

