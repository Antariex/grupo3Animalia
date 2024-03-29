const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mainRouter = require('./routes/index');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
//const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const { application } = require('express');
//const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const apiProductsRouter= require('./routes/api/productsApiRoutes');
const apiCategoriesRouter= require('./routes/api/categoriesApiRoutes');
const apiUsersRouter= require('./routes/api/usersApiRoutes');
const apiSubcategoriesRouter= require('./routes/api/subcategoriesApiRoutes');

// Express
const app = express();


//esto agregué de cors
const cors = require('cors');
app.use(cors())



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

//visto con Ana
//app.set("views", path.resolve(__dirname, "views"));
//app.set("view engine", "ejs");



//Session Middleware
app.use(session({
    secret: "shhh, it's a secret",
    resave: true,
    saveUninitialized: false
  }));

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
// User logged middleware
//app.use(userLoggedMiddleware);

//Router de API
app.use('/api/products',apiProductsRouter);
app.use('/api/users',apiUsersRouter);
app.use('/api/categories',apiCategoriesRouter);
app.use('/api/subcategories',apiSubcategoriesRouter);



// Exportar app
module.exports = app;