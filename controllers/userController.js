const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')

let usersFilePath = path.join(__dirname, '../data/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath , 'utf-8'));


const userController = {

    login: (req, res, next) => {
        res.render('./users/login');
    },
    registro: (req, res, next) => {
        res.render('./users/register');
    },
    carrito: (req, res, next) => {
        res.render('./users/cart');
      },
      //############# REGISTRO EXITOSO ##############
      registerSuccessful: (req, res) => {
        res.render('./users/register_success')
      },
      // Logueo
    
      loginValidation: (req, res) => {
      let userToLogin = User.findByField('email', req.body.email)
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
    },
    ///// CREACION DE USUARIO ////////////
create: (req, res) => {
    const resultValidation = validationResult(req)
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped()
      })
    }
    let emailInUse = User.findByField('email', req.body.email);
    if (emailInUse) {
      return res.render('./users/register', {
        errors: {
          email: {
            msg: 'Este email tiene una cuenta activa en Animalia.'
          }
        }
      })
    }
    delete req.body.confirmPassword

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: req.file ? req.file.filename : 'default.png'
    }

    User.create(userToCreate);
    res.redirect('/')
  },
   //########## PERFIL DE USUARIO ################
  // profile: (req, res) => {
  //   res.render('./users/login_success', { user: req.session.userLogged })
  // },

  // profileAccess: (req, res) => {
  //   res.render('./users/profile', { user: req.session.userLogged })
  // },


  //############ ACTUALIZAR PERFIL USUARIO ##############
  profileUpdate: (req, res) => {
    let user = users.findIndex((element => {
      return element.id === parseInt(req.params.id)
    }))

    users[user].firstName = req.body.firstName === "" ? users[user].productName : req.body.firstName;
    users[user].lastName = req.body.lastName === "" ? users[user].lastName : req.body.lastName;
    users[user].email = req.body.email === "" ? users[user].email : req.body.email;
    users[user].password = bcryptjs.hashSync(req.body.password, 10);
    users[user].avatar = req.file.filename ? req.file.filename : users[user].avatar;
// revisar el campo de ingresar imagen, si esta vacio da error

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '\t'));
    res.redirect('/users/profile/' + req.params.id)
  },
  logout : (req,res) => {
    res.clearCookie('userKey');
    req.session.destroy();
    return res.redirect('/')
  },
}







module.exports = userController;