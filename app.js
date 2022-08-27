const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mainRouter = require('./routes/index');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
//const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Express
const app = express();

//Servidor escuchando en el puerto 3000 && Compatibilidad para Heroku
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
    console.log('http://localhost:3000')
});

//Middlewares - Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')))
//app.use('/products/images/', express.static(path.resolve(__dirname, '../public/images/products')))

//Procesamiento de formularios
app.use(express.urlencoded( {extended: false} ));
app.use(methodOverride('_method'));
app.use(express.json());

//Session Middleware
app.use(session({
    secret: "shhh, it's a secret",
    resave: true,
    saveUninitialized: false
  }));

// User logged middleware
//app.use(userLoggedMiddleware);

//Gestion de session && almacenamiento cookies
app.use(cookieParser());

// Motor de vistas
app.set("view engine", "ejs");

//Enrutador principal (http://localhost:3000/)
app.use(mainRouter);

//Ruoter de BD
app.use('/products', productRouter)

//Router de usuarios (http://localhost:3000/user)
app.use('/users', userRouter)


// Exportar app
module.exports = app;
