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
}

module.exports = categoriesApiController;