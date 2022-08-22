const { Router } = require('express');
const productRouter = Router();
const productAPI = require('../../services/product.api');

productRouter.get('/', productAPI.getProducts);

productRouter.get('/:id', productAPI.getProduct);

module.exports = productRouter;