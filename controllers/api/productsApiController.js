const path = require('path');
const { isNull } = require('util');
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
    

    productByCategory:  (req, res) => {
        let perros =  db.Product.count({
			where: { category_id: 1 }
		});
		let gatos =  db.Product.count({
			where: { category_id: 2 }
		});
		let aves =  db.Product.count({
			where: { category_id: 3 }
		});
        let roedores =  db.Product.count({
			where: { category_id: 4 }
		});
        let peces =  db.Product.count({
			where: { category_id: 5 }
		});
        let ofertas =  db.Product.count({
			where: { category_id: 6 }
		});
               
		Promise.all([perros,gatos,aves,roedores,peces,ofertas])
		.then(([perros,gatos,aves,roedores,peces,ofertas]) => {
           
            return res.json({
               ProductsByCategory: {
                    perros: perros,
                    gatos: gatos,
                    aves: aves,
                    roedores: roedores,
                    peces: peces,
                    ofertas: ofertas,
                },
                meta: {
                    status: 200,
                    },
                urlProductsList: "api/products/productsList"
            })
        })
        },


        productBySubcategory:  (req, res) => {
            let alimentos =  db.Product.count({
                where: { subcategory_id: 1 }
            });
            let farmacia =  db.Product.count({
                where: { subcategory_id: 2 }
            });
            let cuidadosYBelleza =  db.Product.count({
                where: { subcategory_id: 3 }
            });
            let juguetes =  db.Product.count({
                where: { subcategory_id: 4 }
            });
            let otrosArticulos =  db.Product.count({
                where: { subcategory_id: 5 }
            });
           
                   
            Promise.all([alimentos,farmacia,cuidadosYBelleza,juguetes,otrosArticulos])
            .then(([alimentos,farmacia,cuidadosYBelleza,juguetes,otrosArticulos]) => {
               
                return res.json({
                   ProductsByCategory: {
                        alimentos:alimentos,
                        farmacia: farmacia,
                        cuidadosYBelleza: cuidadosYBelleza,
                        juguetes: juguetes,
                        otrosArticulos: otrosArticulos
                    },
                    meta: {
                        status: 200,
                        },
                    urlProductsList: "api/products/countlistsub"
                })
            })
            },




/*
        totalProducts: async (req, res) => {
           let prod = await db.Product.findAll()
           .then((products) => {
                res.status(200).json({
                    totalProducts: products.length,
                });
            });
                  },


*/

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
                    url: 'api/products/recomended/:id'
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
                name: products.name,
                category: products.category,
                price: products.price,
                discount: products.discount,
                description: products.description,
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
                name: products.name,
                category: products.category,
                price: products.price,
                discount: products.discount,
                description: products.description,
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