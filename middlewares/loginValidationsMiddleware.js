const { check } = require('express-validator');


const loginValidation =[
    check('email','El email ingresado no es invalido').toLowerCase().isEmail().normalizeEmail(),  // validar mail no registrado
    check('password', 'contrasena invalida').isLength({min:6, max:16}), //cambiar minimo de contrasena

  ]

  module.exports = loginValidation;
  