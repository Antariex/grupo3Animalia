const { Op } = require('sequelize');
const db = require('../database/models');



const DBProductsController = {

    
    create: function (req, res) {
        //db.Product.findAll()
           // .then(function (products) {
                res.render("./products/productCreate")

    },

    save: function (req, res) {
        db.Product.create({
            category_id: req.body.category,
            subcategory_id: req.body.subcategory,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            thumbnail: req.file.filename,
            description: req.body.productDescription,
            stock: req.body.stock

        })
        .then ((resultado)=> {

            console.log("resultado", resultado);
            //console.log("req", req.body)
            res.redirect('/')
        }
        );
    },

    list: function (req, res) {
        db.Product.findAll()
            .then(function (products) {

                res.render("products/products", {

                    products: products
                });
            })
    },


    detail: function (req, res) {
        db.Product.findByPk(req.params.id, {
            include: [{
                association: "category"
            }, {
                association: "subcategory"
            }] 
            })
            .then(function (products) {
            console.log (products);

                res.render("./products/productDetail", {

                    products: products
                });
            })
    },

    delete: function (req, res) {
        db.Product.destroy({
                where: {
                    id: req.params.id,
                }
            }),
            res.redirect('/');
    },


    edit: function (req, res) {
        let pedidoProducto = db.Product.findByPk(req.params.id, {
            include: [
                "subcategory",
                "category"
            ]
        });
;
        let pedidoCategoria = db.Category.findAll();
        let pedidoSubcategoria = db.Subcategory.findAll();

        Promise.all([pedidoProducto, pedidoCategoria, pedidoSubcategoria])

        .then(function ([producto, categoria, subcategoria]) { 
        res.render('./products/productEdit',{ product: producto, category: categoria, subcategory: subcategoria });
        })
    },
    
    update: function (req, res) {
        //<!-- ACA DEBE IR UN CONDICIONAL DE THUMBNAIL POR LAS IMAGENES -->
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            thumbnail: req.file.filename,
            description: req.body.productDescription,
            stock: req.body.stock
        }, {
            where: {
            id: req.params.id
            }
            });
            res.redirect('/products/productDetail/' + req.params.id)
    }
}

module.exports = DBProductsController;