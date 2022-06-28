// Requires
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
<<<<<<< HEAD
const methodOverride = require('method-override'); // para poder usar los métodos PUT y DELETE
=======
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const bcrypt = require('bcryptjs');
>>>>>>> 9040a26e70a88b34546c16386b799242f9e60cc5

// Express
const app = express();


//Session Middleware//
app.use(session({
    secret: "silence pls, it's a secret",
    resave: true,
    saveUninitialized: false
  }));

// Cookie middleware

/*app.use(cookies())
*/
// User logged middleware
//app.use(userLoggedMiddleware);



//Middlewares - Disponibilidad de la carpeta public
<<<<<<< HEAD
app.use(express.static(path.resolve(__dirname, 'public'))) // Necesario para los archivos estaticos en el folder /public
app.use(express.urlencoded({ extended: false })); //va con llaves adentro lo modifique Y lo habilite
app.use(logger('dev'));//
=======
app.use(express.static(path.resolve(__dirname, 'public')))
//Argument de put y delete
app.use(express.urlencoded( {extended: false} ));
>>>>>>> 9040a26e70a88b34546c16386b799242f9e60cc5
app.use(express.json());


app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride('_method')); //para poder pisar el method="POST" en el formulario por PUT y DELETE


// Motor de vistas
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views")); define la ubicación de la carpeta de las vistas NO ESTA AGREGADA AL CODIGO TODAVIA

//Levantando Servidor en Puerto 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
});

<<<<<<< HEAD
// Rutas requirer y USE
const mainRouter = require('./routes/mainRouter'); // rutas main
const userRouter = require('./routes/userRouter'); // rutas user
const productRouter = require('./routes/productRouter'); //rutas product
=======
// Ruta principal
const mainRouter = require('./routes/mainRouter');

//Ruta Users
const userRouter = require('./routes/userRouter');
//Ruta Products
const productRouter = require('./routes/productRouter');
>>>>>>> 9040a26e70a88b34546c16386b799242f9e60cc5

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

//404


/*app.get("*", (req, res) => {
    res.render(path.join(__dirname, "./views/404.ejs"));
});*/

// Exportar app
module.exports = app;