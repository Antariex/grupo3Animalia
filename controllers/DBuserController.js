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

  edit: (req, res) => {
    res.render('./users/userEdit');
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
          email: req.body.email}
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
        where:{email: req.body.email}
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
                                permission_id: 2, //esto lo asignamos para definir si es usuario o admin 
                                password: hashPassword,
                                avatar: req.file ? req.file.filename : 'default.png'
                                })
                          db.User.create(userToCreate);
                          res.redirect('/')
                  }
              })
  },


logout: (req, res) => {
  res.clearCookie('userEmail');
  req.session.destroy();
  return res.redirect('/');
},

  /*profile: (req,res) => {
    let user = req.session.user
    db.User.findAll()
    .then(function(users){
        res.render('users/profile',{users:users}) 
    })*/

// ver el profile del user
    profile: (req, res) => {
      db.User.findOne({
          where: {
              email: {
                  [Op.like]: req.session.userLogged.email
              }
          }
      }).then(user => {
          console.log(user)
          res.render("./users/profile", {
              user
          })
      })

  },
  
  

  //editar el profile del user
 
 
  edit: (req, res) => {
      db.User.findOne({
          where:{email: req.body.email} // pruebo con traer el mail de form
                      })
      .then(user => {
            console.log(user);
          res.render('./users/register', {user})
        })
        //pruebas que hice que no funcionaron
      //Usando el op sequelize de comparación:
        // where:{email:[Op.like]: req.session.userLogged.email};
        //probé trayendo de la url y tampoco 
        //let name = req.params.name
        //db.User.findOne({where: {name: name}
      },
    
  



//actualizar el profile del user
  update: (req, res) => {
		let name = req.params.name
		db.user.findOne({
				where: {
			  name: name
		   }            
	  })
		.then(user => {
			const resultValidation = validationResult(req);
			let userId = user.id
			if(resultValidation.errors.length > 0){
				return res.render('./users/userEdit', {
					errors: resultValidation.mapped(),
					oldData: req.body
				})
      }
    })
  }
}
module.exports = DBUserController;




  //TODO ESTO HAY QUE HACER
  //###### VISUALIZACION DE LA CREDENCIAL (PROFILE) DEL USUARIO ##########
  /* Método ProfileAcces, ingresando el mail del usuario accedemos a su credencial*/
/*
  profileAcces: (req, res) => {
    res.render('./users/profile')
    db.User.findAll({
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
    


     // Actualizar un user profile
    /*profileUpdate: (req, res) => {
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

                where: {
                  email: req.body.email
                }
              })
                
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
          },*/

   


/*
   //########## PERFIL DE USUARIO ################
  profileAccess: (req, res) => {
     res.render('./users/profile', { user: req.session.userLogged })
   },


 /*esto teníamos
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


