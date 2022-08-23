const express = require('express');
const router = express.Router();
const DBuserController = require('../controllers/DBuserController')
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
router.get('/login', DBuserController.login);
//router.post('./users/login', userController.loginValidations);

/*Ruta del Logout */ //HAY QUE AGREGAR COMO 2DO PARAMETRO EL GUESTMIDDLEWARE
//router.get('/logout', DBuserController.logout)

/* Register */
//router.get('/register', DBuserController.registro);
//router.post('/register/confirm', upload.single('avatar'), validations, DBuserController.create);
/*hay que crear vista de profile a futuro*/



//router.get('/cart', DBuserController.carrito);

module.exports = router;