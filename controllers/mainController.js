const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*const perros = products.filter(products => products.category == 'perros' )
const gatos = products.filter(products => products.category == 'gatos' )
const aves = products.filter(products => products.category == 'aves' )
const peces = products.filter(products => products.category == 'peces' )*/


const mainController = {

    index: (req, res, next) => {
        res.render('index', {products});
    }
};

module.exports = mainController;