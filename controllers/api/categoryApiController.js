const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Users = db.User;

const categoriesApiController = {
    list: (req,res) => {
        db.Category.findAll()
        .then(categories =>{
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories'
                },
                data: categories
            }
            res.json(respuesta);
        })
    },
    detail: (req,res) => {
        db.Category.findByPk(req.params.id)
        .then(category => {
            console.log(category)
            let respuesta = {
                meta: {
                    status:200,
                    total: category.lenght,
                    url:'/api/categories/:id'
                },
            }
            res.json(respuesta);
        });
    },
    categoryProducts: (req,res) => {
        db.Category.findByPk(req.params.id,{
            include: ['products']
        })
        .then(category => {
            let respuesta = {
                meta: {
                    status:200,
                    total:category.lenght,
                    url: '/api/categories/:id/products'
                },
                data: category.products
            }
            res.json(respuesta);
        });
    },
     countByCategory: (req,res) => {
		let perros =  db.Product.count({
			where: { categoryProductId: 1 }
		});
		let gatos =  db.Product.count({
			where: { categoryProductId: 2 }
		});
		let aves =  db.Product.count({
			where: { categoryProductId: 3 }
		});
        let roedores =  db.Product.count({
			where: { categoryProductId: 4 }
		});
        let peces =  db.Product.count({
			where: { categoryProductId: 5 }
		});
        let ofertas =  db.Product.count({
			where: { categoryProductId: 6 }
		});
		Promise.all([perros,gatos,aves,roedores,peces,ofertas])
		.then(([perros,gatos,aves,roedores,peces,ofertas]) => {
			let respuesta = {
                    perros: perros,
                    gatos: gatos,
                    aves: aves,
                    roedores: roedores,
                    peces: peces,
                    ofertas: ofertas
				}
			return res.json(respuesta)
			}
		)
	}
}

module.exports = categoriesApiController;