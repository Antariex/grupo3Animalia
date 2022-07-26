
const db = require('../database/models/Index'); //requerimos sequelize dentro de nuestro controlador
const Product = require('../database/models/Product');

/*llamamos a la DB, establecemos la promesa indicando luego del "db." el nombre de la tabla modelo ubicada en 
la carpeta "models"a la que le aplicaré un método de búsqueda, en este caso findAll.
En el then indicaremos un argumento "products" que es donde se almacenará la respuesta. El then tendrá 2 parámetros, 
el primero es el nombre de la vista que mostraremos por ej "listaDeProductos ubicada en la carpeta "views"
El segundo recibirá la información cargada en el argumento "products", es decir, recibirá la respuesta 
que será el resultado de la búsqueda realizada en la promesa*/

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
            .then(product => { //la sentencia del turboconsolelog la obtengo señalando lo que quiero consologuear
                //y luego apretando en ctrol+alt+d+l
                console.log("🚀 ~ file: DBProductsController.js ~ line 41 ~ product", product),
                    res.redirect('/products')
            })
    },

/*acá levantamos todo lo que lleva del body con el spread operator (...req.body). Dentro del where (siempre dentro
de update y destroy tiene que haber al menos un where) buscamos que el id que levantamos mediante req.params.id
(dato que proviene de la búsqueda url) coincida con la PK id de la BD*. El then me redirige a la vista de los productos*/

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


//en Delete no tenemos html con vista de listado de productos eliminados pero igual creé el scrypt
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

