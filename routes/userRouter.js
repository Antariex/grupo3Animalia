const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.get('/cart', userController.carrito);
router.get('/register', userController.registro);

module.exports = router;