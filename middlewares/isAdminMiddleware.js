function isAdmin(req, res, next) {
  if(req.session.userLogged && req.session.userLogged.isAdmin == true) {
    next()
  }else {
    res.redirect('/users/profile')
  }
}

module.exports = isAdmin;