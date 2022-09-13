const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Products = db.Product;
const Categories = db.Category;
const Users = db.User;

const usersApiController = {
    list: (req,res) => {
        db.User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
            res.json(respuesta);
        })
    },

/*
    totalUsers: async (req, res) => {
        let User = await db.User.findAll()
        .then((users) => {
             res.status(200).json({
                 totalUsers: users.length,
             });
         });
               },

*/




    detail: (req,res) => {
        db.User.findByPk(req.params.id)
        .then(user => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: user.length,
                    url: 'api/user/:id'
                },
                data: user
            }
            res.json(respuesta);
        });
    },
    create: (req,res) => {
        Users
        .create(
            {
                name: req.body.name,
                user: req.body.user,
                email: req.body.email,
                address: req.body.address,
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/create'
                    },
                    data: confirm
                }
            }else{
                respuesta ={
                    meta:{
                        status:200,
                        total:confirm.length,
                        url: 'api/users/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let userId = req.params.id;
        Users.update(
            {
                name: req.body.name,
                user: req.body.user,
                email: req.body.email,
                address: req.body.address,
            },
            {
                where: {id: userId}
            })
            .then(confirm => {
                let respuesta;
                if(confirm){
                    respuesta ={
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/users/update/:id'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let userId = req.params.id;
        Users
        .destroy({where: {id: userId},force: true})
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/users/delete/:id'
                    },
                    data: confirm
                }
            }else{
                respuesta ={
                    meta: {
                    status: 204,
                    total: confirm.length,
                    url: 'api/users/delete/:id'
                },
                data:confirm
            }
        }
        res.json(respuesta);
        })
        .catch(error => res.send(error))
    }

}
module.exports = usersApiController;