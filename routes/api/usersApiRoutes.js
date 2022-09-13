const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

//Rutas
//Listado de todos los users
router.get('/',usersApiController.list);

//Detalle del user
router.get('/:id',usersApiController.detail);

//Crear un user
router.post('/create',usersApiController.create);

//Modificar un user
router.put('/update/:id',usersApiController.update);

//Eliminar un user
router.delete('/delete/:id',usersApiController.destroy);

module.exports = router;

