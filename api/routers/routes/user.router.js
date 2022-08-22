const { Router } = require('express');
const userRouter = Router();
const userAPI = require('../../services/user.api');

serRouter.get('/', userAPI.usersList);

userRouter.get('/:id', userAPI.getUser);

module.exports = userRouter;