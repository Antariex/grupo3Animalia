const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/api/productsApiController')

//Rutas
router.get('/', productsApiController.list);

//Detalle de un producto
router.get('/:id',productsApiController.detail);

//Filtra productos por descuento
router.get('/recomended/:id', productsApiController.recomended);

//Agregar un producto
router.post('/create', productsApiController.create);

//Modificar un producto
router.put('/update/:id', productsApiController.update);

//Eliminar un producto
router.delete('/delete/:id', productsApiController.destroy);

module.exports = router;