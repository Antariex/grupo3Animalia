const { validationResult } = require('express-validator')
const { response } = require('express');
const bcryptjs = require('bcryptjs')
const {Op} = require('sequelize');
const db = require('../database/models');
//const fs = require('fs')
//const path = require('path')
//const User = require('../models/User')
//let usersFilePath = path.join(__dirname, '../data/users.json')
//let users = JSON.parse(fs.readFileSync(usersFilePath , 'utf-8'));


const DBUserController = {

    login: (req, res) => {
        res.render('./users/login');
      },
    registro: (req, res) => {
        res.render('./users/register');
        console.log("create")
      },
    admin: (req, res) => {
        res.render('./users/admin')
        console.log("create")
      },
    carrito: (req, res) => {
        res.render('./users/cart');
      },
      //############# REGISTRO EXITOSO ##############
    registerSuccessful: (req, res) => {
        res.render('./users/register_success')
      },

      
      //###### VALIDACION DE USUARIO ################
      
    loginValidation: (req, res) => {
        let userToLogin = db.User.findByField('email', req.body.email)
        if (userToLogin) {
          let passwordCheck = bcryptjs.compareSync(req.body.password, userToLogin.password)
          if (passwordCheck) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if(req.body.remember_me) {
              res.cookie('userKey',req.body.email, {maxAge: (1000 * 60) * 60})
            }
            return res.redirect('/users/profile')
          }
        }
        return res.render('./users/login', {
          errors: {
            email: {
              msg: 'Los datos ingresados no son correctos, por favor intente nuevamente.'
            }
          }
        })
        console.log("req", req.body)
      },

     
      //###### CREACION DE USUARIO ##########
    create: (req, res) => {
        const resultValidation = validationResult(req)
        console.log("create")
        if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped()
      })
    }
    db.User.findOne({ where: { email:  req.body.email }})
  
    .then ( emailInUse => {
      console.log(emailInUse)
      if (emailInUse) {
        return res.render('./users/register', {
        
          errors: {
            email: {
              msg: 'Este email tiene una cuenta activa en Animalia.'
            }
          }
        })
      }
      //delete req.body.confirmPassword
  
      let userToCreate = {
        ...req.body,
        permission_id: 1, //esto lo asignamos para definir si es usuario o admin pero hay que hacerlo desde la vista ejs
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file ? req.file.filename : 'default.png'
      }
  
    db.User.create(userToCreate);
  
      res.redirect('/')
    })
  
    
  
  },
  /*
   //########## PERFIL DE USUARIO ################
   profile: (req, res) => {
  res.render('./users/login_success', { user: req.session.userLogged })
  },

  profileAccess: (req, res) => {
     res.render('./users/profile', { user: req.session.userLogged })
   },


  //############ ACTUALIZAR PERFIL USUARIO ##############
  profileUpdate: (req, res) => {
    let user = db.User.findIndex((element => {
      return element.id === parseInt(req.params.id)
    }))

    /* #### iteración en el JSon#####
    users[user].firstName = req.body.firstName === "" ? users[user].productName : req.body.firstName;
    users[user].lastName = req.body.lastName === "" ? users[user].lastName : req.body.lastName;
    users[user].email = req.body.email === "" ? users[user].email : req.body.email;
    users[user].password = bcryptjs.hashSync(req.body.password, 10);
    users[user].avatar = req.file.filename ? req.file.filename : users[user].avatar;
// revisar el campo de ingresar imagen, si esta vacio da error

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'));
    res.redirect('/users/profile/' + req.params.id)
  },*/

/*
  logout : (req,res) => {
    res.clearCookie('userKey');
    req.session.destroy();
    return res.redirect('/')
  },*/
}



module.exports = DBUserController;