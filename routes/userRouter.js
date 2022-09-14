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
const imgFilePath = path.join(__dirname, "../public/images/avatars");

/* Config del Multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/avatars');
      //cb(null, imgFilePath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-userImg' + path.extname(file.originalname));
    },
  });

  /* Multer SEND */
  const upload = multer({ storage: storage });

  // #####CRUD Users##############
  //Ruta Login form //
  //router.get('/login', DBUserController.login);
  //router.post('/login', DBUserController.loginValidation);
  router.get('/login', guestMiddleware, DBUserController.login);
  router.post('/login', registerValidationsMiddleware, loginValidationsMiddleware, DBUserController.loginValidation);
  router.get('/admin', DBUserController.admin);

  //Ruta del Register form
  router.post('/register', upload.single('thumbnail'), registerValidationsMiddleware, DBUserController.create);

  //router.post('./login',loginValidationsMiddleware, DBUserController.loginValidation);
  /* Register */
  router.get('/register', DBUserController.registro);

  /* Editar usuario */
  router.get("/userEdit", DBUserController.edit);
  // router.get("/userEdit", authMiddleware, isAdminMiddleware, DBUserController.edit);

  /*Ruta del Logout */
router.get('/logout', DBUserController.logout)

// User profile ///*hay que crear vista de profile a futuro*/
//router.get("/profile", DBUserController.profileAcces);
//router.get("/profile", authMiddleware, isAdminMiddleware, DBUserController.profileAcces);
//guardar un usuario  // hay que crear vista
router.put("/userEdit", DBUserController.update);
//router.put("/edit", authMiddleware, isAdminMiddleware, DBUserController.update);

router.get('/cart', DBUserController.carrito);

module.exports = router;