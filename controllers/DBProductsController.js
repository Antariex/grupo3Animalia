
const db = require('../database/models/Index');
const Product = require('../database/models/Product');



const DBProductsController = {

    list: (req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render("products", {
                    products
                })
            })
    },

    edit: (req, res) => {
        db.Product.findbyPK(req.params.product_id)
            .then(product => res.render("productDetail", {
                product
            }))
    },

    //ADD a Product//
    add: function (req, res) {
        res.render('productEdit')
    },

    //CREATE A PRODUCT//
    create: (req, res) => {
        db.Product.create({
                product_id: req.body.product_id,
                price: req.body.price,
                discount: req.body.discount,
                image: req.body.image,
                stock: req.body.stock
            })
            .then(product => { 
                console.log("🚀 ~ file: DBProductsController.js ~ line 41 ~ product", product),
                    res.redirect('/products')
            })
    },

//ACTUALIZAR UN PRODUCTO//
    update: (req,res) => {
        db.Product.update({
            ...req.body
        },
        {
            where: {id: req.params.product_id}
        })
        .then(() => res.redirect('/products/productDetail/'+ req.params.product_id))
    },


//Delete Product//
    delete: (req,res) => {
        db.Product.findbyPK(req.params.product_id)
        .then(Product => {res.render('productsDelete', {Product})})
    },

    destroy: (req,res) => {
        db.Product.destroy({where: {id: req.params.product_id}})
        .then(() => res.redirect('/products'))
     
    },
}

module.exports = DBProductsController;

