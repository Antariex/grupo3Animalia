<<<<<<< HEAD
const db = require('../database/models'); //requerimos sequelize dentro de nuestro controlador
const Product = require('../database/models/Product');

const DBProductsController = {

=======

const db = require('../database/models/Index');
const Product = require('../database/models/Product');



const DBProductsController = {
>>>>>>> e887e11b3f5044c1706ee3969b770d893554a69e

    create: function (req, res) {
        db.Product.findAll()
            .then(function (products) {
                res.render("productDetail", {
                    products: Product
                });
            })
    },

<<<<<<< HEAD
    save: function (req, res) {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            thumbnail: req.file.filename,
            description: req.body.productDescription,
            stock: req.body.stock
        });
        res.redirect('./products/productCreate');
    },

    list: function (req, res) {
        db.Product.findAll()
            .then(function (products) {
                res.render("productDetail", {
                    products: Product
                });
            })
    },

    //a ver cómo definimos la función List y Detail, es decir a cual le atribuimos la vista :id
    detail: function (req, res) {
        db.Product.findByPk(req.params.id, {
                include: [{
                    association: "category"
                }, {
                    association: "subcategory"
                }]
            })
            .then(function (products) {
                res.render("productDetail", {
                    products: Product
                });
            })
    },

    delete: function (req, res) {
        db.Product.destroy({
                where: {
                    id: req.params.id,
                }
            }),
            res.redirect('/products');
    },


    edit: function (req, res) {
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategoria = db.Category.findAll();
        let pedidoSubcategoria = db.Subcategory.findAll();

        Promise.all([pedidoProducto, pedidoCategoria, pedidoSubcategoria])
        .then(function ([producto, categoria, subcategoria]) { 
        res.render("editProduct",{producto: producto, categoria: categoria, producto:producto });
        })
    },

    update: function (req, res) {
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
            res.redirect("/product" + req.params.id);
    }
}

module.exports = DBProductsController;
=======
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

>>>>>>> e887e11b3f5044c1706ee3969b770d893554a69e
