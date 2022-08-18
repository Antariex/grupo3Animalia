const db = require('../database/models'); //requerimos sequelize dentro de nuestro controlador


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
                res.render("/", {
                    products: products
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
                res.render("/productDetail/:id", {
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
            res.redirect('/delete/:id');
    },


    edit: function (req, res) {
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategoria = db.Category.findAll();
        let pedidoSubcategoria = db.Subcategory.findAll();

        Promise.all([pedidoProducto, pedidoCategoria, pedidoSubcategoria])
        .then(function ([producto, categoria, subcategoria]) { 
        res.render("editProduct",{producto: producto, categoria: categoria, subcategoria: subcategoria });
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
