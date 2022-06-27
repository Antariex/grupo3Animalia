const path = require('path');
const userController = {

    login: (req, res, next) => {
        res.render('./users/login');
    },
    registro: (req, res, next) => {
        res.render('./users/register');
    },
    carrito: (req, res, next) => {
        res.render('./users/cart');
    },
    aboutUs: (req, res, next) => {
        res.render('./users/aboutUs');
    },
    contactUs: (req, res, next) => {
        res.render('./users/contactUs');
    },
};

module.exports = userController;