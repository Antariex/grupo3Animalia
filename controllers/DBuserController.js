//const fs = require('fs')
//const path = require('path')
const { validationResult} = require('express-validator')
const { response} = require('express');
const bcryptjs = require('bcryptjs')
const { Op} = require('sequelize');
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

  admin: (req, res) => {
    res.render('./users/admin');
  },

  registro: (req, res) => {
    res.render('./users/register');

  },
  carrito: (req, res) => {
    res.render('./users/cart');
  },
  //############# REGISTRO EXITOSO ##############
  registerSuccessful: (req, res) => {
    res.render('./users/register_success')
  },


  //###### VALIDACION DE USUARIO ################
  /* Método loginValidation: ingresamos a la página de login, cargamos mail y contraseña y si el usuario
  existe en la BD accedemos al home, en caso contrario nos arroja msj en pág login*/
 
  loginValidation: (req, res) => {
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function (userDB) {
        console.log(userDB)
            if (userDB) {
                console.log("userDB.password", typeof userDB.password, userDB.password)
                let passwordCheck = bcryptjs.compareSync(req.body.password, userDB.password)
                console.log("contraseña",passwordCheck)
                    if (passwordCheck) {
                        delete userDB.password;
                        req.session.userLogged = userDB;
                            if (req.body.remember) {
                                  res.cookie('userKey', req.body.email, {
                                  maxAge: (1000 * 60) * 60})
                                      }
                            return res.redirect("/")
                    } else { //error de contraseña no coincide
                          res.render('users/login', { errors: { password: { msg: 'Contraseña incorrecta' } }, oldData: req.body });
                            }
            } else { //error de usuario no encontrado
                   res.render('users/login', { errors: { email: { msg: '*Email incorrecto' } }, oldData: req.body });
      }
  });
},







  //###### CREACION DE USUARIO ##########
  /* Método create, desde la página del form register cargamso por primera vez los datos
  de un nuevo usuario para ingresarlos en la BD*/

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
        where:{
                email: req.body.email
              }
          })
        .then(emailInUse => {
            if (emailInUse) {
                return res.render('./users/register', {
                errors: {
                email: {msg: 'Este email ya tiene una cuenta en Animalia.'}
                        },
                oldData: req.body
                        })
                  } else if (emailInUse == null) {
                      let image
                            if (req.file != undefined) {
                                image = req.file.filename
                                  }else{
                                      image = 'avatar.png'
                                        }
                                let hashPassword = bcryptjs.hashSync(req.body.password, 10)
                                console.log(hashPassword);
                                let userToCreate = ({
                                ...req.body,
                                permission_id: 2, //esto lo asignamos para definir si es usuario o admin pero hay que hacerlo desde la vista ejs
                                password: hashPassword,
                                avatar: req.file ? req.file.filename : 'default.png'
                                })
                          db.User.create(userToCreate);
                          res.redirect('/')
                  }
              })
  },

<<<<<<< HEAD
  //###### VISUALIZACION DE LA CREDENCIAL (PROFILE) DEL USUARIO ##########
  /* Método ProfileAcces, ingresando el mail del usuario accedemos a su credencial*/
/*
  profileAcces: (req, res) => {
    res.render('./users/profile')
    /*db.User.findAll({
      where: {
        email: {
          [Op.like]: req.session.userLogged.email
        }
      }
    }).then(user => {
      console.log(user)
      res.render('./users/profile', {
      })
    })
  },
    
*/

  // Editar un user profile
 /*edit: (req, res) => {
    //res.render('./users/userEdit');
  //},
    db.User.findOne({
      where: {
        email: {
          //[Op.like]: req.session.userLogged.email
          [Op.like]: req.body.email
        }
      }
    }).then(user => {
      res.render('./users/userEdit', {user: user
      })
    })
  },*/

  edit:function (req,res) {
    let user = req.session.user
    db.User.findAll()
    .then(function(users){
        res.render('./users/userEdit',{users:users}) 
    })
}, 

logout: (req, res) => {
  if (req.session) {
      req.session.destroy(err => {
          if (err) {
              res.status(400).send('Unable to log out')
          } else {
              if(req.cookies.recordame){
                  res.clearCookie("userkey");
              }
              res.redirect('/')
          }
      });
  } else {
      res.end()
  }
},
  }
  
  module.exports = DBUserController;

  
/*
    // Actualizar un user profile
    profileUpdate: (req, res) => {
      //res.render('./users/userEdit');
    //},

db.User.findOne({
  .then(function (userDB) {
      db.User.profileUpdate({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        thumbnail: req.file.filename,
        description: req.body.productDescription,
        stock: req.body.stock
        

=======
 
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
>>>>>>> 461d167c8de32e107ba70b975f6930bcdbc7d91a
        where: {
          email: req.body.email
        }
      })
<<<<<<< HEAD
        
        where: {
          email: {
            //[Op.like]: req.session.userLogged.email
            [Op.like]: req.body.email
          }
        }
      }).then(user => {
        res.render('./users/userEdit', {user: user
        })
      })
    },

*/



/*
=======

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

  profileAccess: (req, res) => {
     res.render('./users/profile', { user: req.session.userLogged })
   },

   
  //############ ACTUALIZAR PERFIL USUARIO ##############
  profileUpdate: (req, res) => {
    let user = db.User.findIndex((element => {
      return element.id === parseInt(req.params.id)
    }))
  },

   edit: (req, res) => {
    db.User.findOne({
        where: {
            email: {
                [Op.like]: req.session.userLogged.email
            }
        }
    }).then(user => {
        res.render("edit-profile", {
            user
        })
    })
},


  logout: (req, res) => {
    res.clearCookie('userKey');
    req.session.destroy();
    return res.redirect('/')
  },
  }


   /*
>>>>>>> 461d167c8de32e107ba70b975f6930bcdbc7d91a
   //########## PERFIL DE USUARIO ################
  profileAccess: (req, res) => {
     res.render('./users/profile', { user: req.session.userLogged })
   },


<<<<<<< HEAD
 /*esto teníamos
      loginValidation: (req, res) => {
          let userToLogin = db.User.findByField('email', req.body.email)
          if (userToLogin) {
            let passwordCheck = bcryptjs.compareSync(req.body.password, userToLogin.password)
=======

 /*
         //esto teníamos
      loginValidation: (req, res) => {
          let userToLogin = db.User.findByField('email', req.body.email)
          if (userToLogin) {
            let passwordCheck = bcrypt.compareSync(req.body.password, userToLogin.password)
>>>>>>> 461d167c8de32e107ba70b975f6930bcdbc7d91a
            if (passwordCheck) {
              delete userToLogin.password;
              req.session.userLogged = userToLogin;
              if(req.body.remember_me) {
                res.cookie('userKey',req.body.email, {maxAge: (1000 * 60) * 60})
              }
              return res.redirect('/users/profile')
<<<<<<< HEAD
=======

>>>>>>> 461d167c8de32e107ba70b975f6930bcdbc7d91a
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
<<<<<<< HEAD
=======

       */

>>>>>>> 461d167c8de32e107ba70b975f6930bcdbc7d91a
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


