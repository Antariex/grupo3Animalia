const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Subcategories = db.Subcategory;
const Users = db.User;

const subcategoriesApiController = {
    list: (req,res) => {
        db.Subcategory.findAll()
        .then(subcategories =>{
            let respuesta = {
                meta: {
                    status : 200,
                    total: subcategories.length,
                    url: 'api/subcategories'
                },
                data: subcategories
            }
            res.json(respuesta);
        })
    },
    detail: (req,res) => {
        db.Subcategory.findByPk(req.params.id)
        .then(subcategory => {
            console.log(subcategory)
            let respuesta = {
                meta: {
                    status:200,
                    total: subcategory.lenght,
                    url:'/api/subcategories/:id'
                },
            }
            res.json(respuesta);
        });
    },
    subcategoryProducts: (req,res) => {
        db.Subcategory.findByPk(req.params.id,{
            include: ['products']
        })
        .then(subcategory => {
            let respuesta = {
                meta: {
                    status:200,
                    total:subcategory.lenght,
                    url: '/api/subcategories/:id/products'
                },
                data: subcategory.products
            }
            res.json(respuesta);
        });
    },
     countBySubcategory: (req,res) => {
		let alimentos =  db.Product.count({
			where: { subcategoryProductId: 1 }
		});
		let farmacia =  db.Product.count({
			where: { subcategoryProductId: 2 }
		});
		let cuidadosYBelleza =  db.Product.count({
			where: { subcategoryProductId: 3 }
		});
        let juguetes =  db.Product.count({
			where: { subcategoryProductId: 4 }
		});
        let otrosArticulos =  db.Product.count({
			where: { subcategoryProductId: 5 }
		});
       
        Promise.all([alimentos,farmacia,cuidadosYBelleza,juguetes,otrosArticulos])
		.then(([alimentos,farmacia,cuidadosYBelleza,juguetes,otrosArticulos]) => {
			let respuesta = {
                alimentos:alimentos,
                farmacia: farmacia,
                cuidadosYBelleza: cuidadosYBelleza,
                juguetes: juguetes,
                otrosArticulos: otrosArticulos
				}
			return res.json(respuesta)
			}
		)
	}
}

module.exports = subcategoriesApiController;