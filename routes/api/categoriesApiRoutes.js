const express = require('express');
const categoriesApiController = require('../../controllers/api/categoryApiController');
const router = express.Router();

//Rutas
//Listado de todas las categorias
router.get('/', categoriesApiController.list);

//Detalle de la categoria
router.get('/id',categoriesApiController.detail);

//Categorias por producto
router.get('/id/products', categoriesApiController.categoryProducts);

//Contar categoría
router.get('/countByCategory', categoriesApiController.countByCategory)


module.exports = router;