//const fs = require('fs')
//const path = require('path')
const {validationResult} = require('express-validator')
const {response} = require('express');
const bcrypt = require('bcryptjs')
const {Op} = require('sequelize');
const db = require('../database/models');
//const User = require('../models/User')
//const fs = require('fs')
//const path = require('path')
//let usersFilePath = path.join(__dirname, '../data/users.json')
//let users = JSON.parse(fs.readFileSync(usersFilePath , 'utf-8'));

const DBUserController = {

    login: (req, res) => {
        res.render('./users/login');
      },
    registro: (req, res) => {
        res.render('./users/register');

      },
    admin: (req, res) => {
        res.render('./users/admin')

      },
    carrito: (req, res) => {
        res.render('./users/cart');
      },
      
      //############# REGISTRO EXITOSO ##############
    registerSuccessful: (req, res) => {
        res.render('./users/profile')
      },
    login: (req, res) => {
    res.render('./users/login');
  },
  admin: (req, res) => {
    res.render('./users/admin');
  },
  registro: (req, res) => {
    res.render('./users/register');
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
  //Modifico lo que teníamos

  loginValidation: (req, res) => {

  loginValidation: (req, res) => {
       db.User.findOne({
        where: {
          email: req.body.email}
      })
      .then(function (userInDB) {
          if (userInDB) {
              let passwordCheck = bcrypt.compareSync(req.body.password, userInDB.password)
              if (passwordCheck) {
                delete userInDB.password;
                req.session.userLogged = userInDB;
                if(req.body.remember) {
                  res.cookie('userKey',req.body.email, {maxAge: (1000 * 60) * 60})
                  }

                  return res.redirect("/")
                  }
                }
                  return res.render('login', {
                    errors: {
                      msg: 'Los datos ingresados no son correctos, por favor intente nuevamente.'
                    }
                  })
                ;
              })
             },

  /*
         //esto teníamos
      loginValidation: (req, res) => {
          let userToLogin = db.User.findByField('email', req.body.email)
          if (userToLogin) {
            let passwordCheck = bcrypt.compareSync(req.body.password, userToLogin.password)
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

       */
  //###### CREACION DE USUARIO ##########
  create: (req, res) => {
    const resultValidation = validationResult(req)
    console.log("create")
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })

      .then(emailInUse => {
        if (emailInUse) {
          return res.render('./users/register', {

            errors: {
              email: {
                msg: 'Este email ya tiene una cuenta en Animalia.'
              }
            },
            oldData: req.body
          })
        } else if (emailInUse == null) {
          let image

          if (req.file != undefined) {
              image = req.file.filename

          } else {
              image = 'avatar.png'
          }
        //delete req.body.confirmPassword

        let userToCreate = ({
          ...req.body,
          permission_id: 1, //esto lo asignamos para definir si es usuario o admin pero hay que hacerlo desde la vista ejs
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: req.file ? req.file.filename : 'default.png'
        })

        db.User.create(userToCreate);

        res.redirect('/')
      } 
    })
  },


  profile: (req, res) => {
      res.render('./users/login_success', { user: req.session.userLogged })
    },
  /*
   //########## PERFIL DE USUARIO ################
  profileAccess: (req, res) => {
     res.render('./users/profile', { user: req.session.userLogged })
   },


//teníamos esto:
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

  logout: (req, res) => {
    res.clearCookie('userKey');
    req.session.destroy();
    return res.redirect('/')
  },
}


module.exports = DBUserController;
