const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const DBUserController = require('../controllers/DBUserController');

/* Require Middlewares*/
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const loginValidationsMiddleware = require('../middlewares/loginValidationsMiddleware');
const registerValidationsMiddleware = require('../middlewares/registerValidationsMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

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
  const upload = multer({ storage: storage });

  // #####CRUD Users##############

  /*Ruta del Login*/
router.get('/login', /*guestMiddleware,*/ DBUserController.login);
//router.post('./users/login', /*upload.single('avatar'), registerValidationsMiddleware,*/ DBUserController.loginValidation);

/*authMiddleware, falla
guestMiddleware, sin falla
isAdminMiddleware, falla
registerValidationsMiddleware, sin falla
userLoggedMiddleware, sin falla */

//router.post('./users/login',loginValidationsMiddleware, DBuserController.loginValidation);

/*Ruta del Logout */ //HAY QUE AGREGAR COMO 2DO PARAMETRO EL GUESTMIDDLEWARE
//router.get('/logout', DBuserController.logout)

/* Register */
router.get('/register', DBUserController.registro);
router.post('/register/confirm', upload.single('avatar'), registerValidationsMiddleware, DBUserController.create);
/*hay que crear vista de profile a futuro*/


router.get('/cart', DBUserController.carrito);

module.exports = router;
