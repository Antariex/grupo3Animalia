// Requires
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
//const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


// Express
const app = express();

//Session Middleware//
app.use(session({
    secret: "silence pls, it's a secret",
    resave: true,
    saveUninitialized: false
  }));

// User logged middleware

//app.use(userLoggedMiddleware);



//Middlewares - Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')))

//Argument de put y delete
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());


app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride('_method'));


// Motor de vistas
app.set("view engine", "ejs");

//Levantando Servidor en Puerto 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
});

// Ruta principal
const mainRouter = require('./routes/mainRouter');

//Ruta Users
const userRouter = require('./routes/userRouter');
//Ruta Products
const productRouter = require('./routes/productRouter');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

//404
/*app.get("*", (req, res) => {
    res.render(path.join(__dirname, "./views/404.ejs"));
});*/

// Exportar app
module.exports = app;