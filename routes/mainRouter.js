const express = require('express');
const router = express.Router();
const path = require('path');

//controller require
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
//router.???('/search', mainController.search);

module.exports = router;