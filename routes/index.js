const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const DBMainController = require('../controllers/DBMainController');

//Homepage (http://localhost:3000) // otras vista del home
router.get('/', DBMainController.home)
router.get('/aboutUs', DBMainController.aboutUs);
router.get('/sucursales', DBMainController.sucursales);





//Exportamos las variables del router
module.exports = router