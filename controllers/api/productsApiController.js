const path = require('path');
const db = require('../../database/models');

const Products = db.Product;
const Categories = db.Category;
const Users = db.User;

const productsApiController = {
    list: (req,res) => {
        db.Product.findAll({include: ['category']})

        .then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/products'
                },
                data: products.map(products => {
                    return {
                        name: products.name,
                        category: products.category,
                        price: products.price,
                        discount: products.discount,
                        description: products.description,
                    }
                })
            }
            res.json(respuesta);
        })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id,
            {
                include: ['category']
            })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products/:id'
                    },
                    data: products
                }
                res.json(respuesta);
            });
    },
    recomended: (req,res) => {
        db.Product.findAll({
            include: ['category'],
            where: {
                discount: {[db.Sequelize.Op.gte] : req.params.discount}
            },
            order: [
                ['discount', 'DESC']
            ]
        })
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: 'api/products/recomended/:discount'
            },
            data: products
        }
        res.json(respuesta);
        })
        .catch(error => console.log(error))
    },
    create: (req,res) => {
        Products
        .create(
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {

                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status:200,
                        total: confirm.length,
                        url:'api/products/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let productId = req.params.id;
        Products.update(
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
            },
            {
                where: {id: productId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let productId = req.params.id;
        Products
        .destroy({ where: { id: productId}, force: true})
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data: confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })
        .catch(error => res.send(error))
    }

}

module.exports = productsApiController;


