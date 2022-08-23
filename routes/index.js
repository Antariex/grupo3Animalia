const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const DbmainController = require('../controllers/DbmainController');

//Homepage (http://localhost:3000) // otras vista del home
router.get('/', DbmainController.home)
router.get('/aboutUs', DbmainController.aboutUs);
router.get('/sucursales', DbmainController.sucursales);





//Exportamos las variables del router
module.exports = router