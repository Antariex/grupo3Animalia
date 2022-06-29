const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer');
const path = require('path');
const loginValidations = require('../middlewares/loginValidations');
const validations = require('../middlewares/registerValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* Config del Multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-userImg' + path.extname(file.originalname));
    },
  });

  /* Multer SEND */
  const upload = multer({ storage });

  /*Ruta del Login*/ //
router.get('/login', userController.login);
//router.post('./users/login', u  serController.loginValidations);

/*Ruta del Logout */ //HAY QUE AGREGAR COMO 2DO PARAMETRO EL GUESTMIDDLEWARE
router.get('/logout', userController.logout)

/* Register */
router.get('/register', userController.registro);
router.post('/register/confirm', upload.single('avatar'), validations, userController.create);
/*hay que crear vista de profile a futuro*/



router.get('/cart', userController.carrito);

module.exports = router;