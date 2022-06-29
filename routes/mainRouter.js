const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/aboutUs', mainController.aboutUs);
router.get('/sucursales', mainController.sucursales);

module.exports = router;