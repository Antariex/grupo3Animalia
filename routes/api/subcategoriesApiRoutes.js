const express = require('express');
const subcategoriesApiController = require('../../controllers/api/subcategoryApiController');
const router = express.Router();

//Rutas
//Listado de todas las subcategorias
router.get('/', subcategoriesApiController.list);

//Detalle de la subcategoria
router.get('/id',subcategoriesApiController.detail);

//subCategorias por producto
router.get('/id/productssubcategory', subcategoriesApiController.subcategoryProducts);

//Contar categoría
router.get('/countBySubcategory', subcategoriesApiController.countBySubcategory)


module.exports = router;