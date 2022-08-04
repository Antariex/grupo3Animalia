const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const DBProductsController = require('../controllers/DBProductsController');


//Configuración de entorno
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/products');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-img${path.extname(file.originalname)}`);
  }
})

//Cargamos las variables de entorno
const upload = multer({storage})

//Rutas
router.get('/', productController.catalogo);
router.get('/productCreate',productController.creacion);
router.get('/productDetail/:id', productController.detalle);
router.post('/create/confirm',upload.single('thumbnail'),productController.almacenar);
router.get('/edit/:id',productController.edicion);
router.put('/edit/:id/succed/',upload.single('thumbnail'),productController.actualizar);
router.delete('/delete/:id', productController.borrado);

<<<<<<< HEAD
//CRUD BD:
router.get('/productCreate', DBProductsController.create);
router.post('/create/confirm', DBProductsController.save);
router.get('/productDetail/:id', DBProductsController.list); // PREGUNTAR SI VA "productDetail/:id"
router.get('/:id', DBProductsController.detail);
router.post('/delete/:id', DBProductsController.delete);
router.get('/productEdit/:id', DBProductsController.edit);
router.post('productEdit/:id', DBProductsController.update);
=======
//agregado por FC basado microdesafío clase 31PG, direcciona a views/products/products.ejs 
//router.get('/products', DBPoductsController.list)

//Rutas CRUD BD agregado por FC basado en la clase 32
//Renderización de una vista de un producto creado:
//router.get('/products/add', DBProductController.add);
//router.post('/products/create/confirm', DBProductController.create); // Esta ruta fue tomada de productCreate.ejs línea 21 

//router.get('/products/edit/:id', DBProductController.edit);
//¿en nuestro caso ttrataremos put y edit como una sola acción dentro del formulario de edición???
//router.put('', DBProductController.update);

//router.get('/products/delete/:id', DBProductController.delete);
//router.delete('/products/delete/:id', DBProductController.destroy);




>>>>>>> e887e11b3f5044c1706ee3969b770d893554a69e
//Exportamos la variable del router
module.exports = router;






