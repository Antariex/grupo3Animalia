const { Router } = require('express');
const apiRouter = Router();
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');

apiRouter.use('/products', productRouter);
apiRouter.use('/users', userRouter);

app.set('json spaces', 2);

module.exports = apiRouter;