//teníamos esto

/*function isAdmin(req, res, next) {
  if(req.session.userLogged && req.session.userLogged.isAdmin == true) {
    next()
  }else {
    res.redirect('/users/profile')
  }
}

module.exports = isAdmin;
*/

const path = require('path');
const fs = require('fs');
const db = require("../database/models");

function isAdminMiddleware(req, res, next) {
    
    if (req.cookies.remember != undefined && req.session.userLogged == undefined ) {
        db.User.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(userInDB){
        if(userInDB){
            var userLogged = userInDB;
                
        }
        if(req.session && req.session.userLogged){
        req.session.userLogged = userLogged;
        res.locals.userLogged = req.session.userLogged;
        };
    }); 
};
next()
}

module.exports = isAdminMiddleware;