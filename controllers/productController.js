const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
const { validationResult } = require('express-validator') 

const productController = {
    
    catalogo: (req, res) => {
        res.render('./products/products', {
            products
        });
    },

    detalle: (req, res) => {
        let productoBuscado = products.find(producto => {
            return producto.id == req.params.id
        })
        res.render("./products/productDetail", {
            producto: productoBuscado
        });
    },

    creacion: (req, res) => {
        res.render('./products/productCreate');

        
    },

    almacenar: (req, res) => {
        let newProduct = {
            id: Date.now(),
            ...req.body,
            thumbnail: req.file.filename
        }
        //Guardamos el nuevo producto en el array de productos
        products.push(newProduct)
        //Ecribimos los cambios en el JSON
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
        //Redireccionamos al detalle
        res.redirect("/products/detail/" + newProduct.id)
    },

    edicion: (req, res) => {
        let id = req.params.id
        let productToedit = products.find(element => { return element.id === parseInt(req.params.id) })
        res.render('./products/productEdit',{ product: productToedit });
    },

    actualizar: (req, res) => {
        let productID = products.findIndex((element => {
            return element.id === parseInt(req.params.id)
          }))

        let oldProduct = products.find(product => {
            return product.id == parseInt(req.params.id)
        })

          let editedProduct = {
            ...req.body,
            id: oldProduct.id,
            thumbnail: req.file ? req.file.filename : oldProduct.thumbnail,
            category: req.body.category ? req.body.category : oldProduct.category
        }


        products[productID] = editedProduct
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
        res.redirect('/products/detail/' + req.params.id)
        },


    borrado: (req, res) => {
        let id = req.params.id
        let productoABorrar = products.filter(product => product.id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(productoABorrar));
        res.redirect("/products")
    }

};

module.exports = productController;