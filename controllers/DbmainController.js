//const { json } = require('express');
//const path = require('path');
//const fs = require('fs');
//const productFilePath = path.join(__dirname, '../data/products.json');
//const products = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));
const db = require('../database/models/index');


const DBMainController = {

    home: (req, res) => {
        db.Product.findAll()
        .then(function (products){
            res.render('./index', {products});
        })
    },

    aboutUs: (req, res) => {
        res.render('./aboutUs'); 

    },
    sucursales: (req, res) => {
        res.render('./sucursales');
    }
};

module.exports = DBMainController;