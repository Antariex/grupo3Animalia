const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {

    index: (req, res, next) => {
        res.render('index', {products});
    },
    aboutUs: (req, res, next) => {
        res.render('aboutUS');
    },
    sucursales: (req, res, next) => {
        res.render('sucursales');
    }
};

module.exports = mainController;