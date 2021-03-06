const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')

//Homepage (http://localhost:3000) // otras vista del home
router.get('/', mainController.home)
router.get('/aboutUs', mainController.aboutUs);
router.get('/sucursales', mainController.sucursales);

//Router de productos (http://localhost:3000/products)
router.use('/products', productRouter)

//Router de usuarios (http://localhost:3000/user)

//Router para acceder a la base de datos agregado por FC
router.get('/products', DBProductController.js)
router.use('/user', userRouter)

//Exportamos las variables del router
module.exports = router