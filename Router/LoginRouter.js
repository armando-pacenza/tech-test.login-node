const express = require('express');
const passport = require('passport');

const loginRouter = express.Router();

function cualquierNombre(controller) {
  loginRouter.route('/')
    .get(controller.getBarra);

  loginRouter.route('/login/sign-in')
    .get(controller.getLoginSignIn)
    .post(passport.authenticate('local', {
      successRedirect: '/contrato',
      failureRedirect: '/login/sign-in?status=invalido'
    }));

  loginRouter.route('/login/sign-out')
    .get(controller.getLoginSignOut);

  /*
  * Esta es la forma de validar usuario sin usar passport. Al post del login se le cuelga
  * el validar usuario que consulta a la base de datos.
  *  Solucion limitada porque no maneja concepto de session.
  *
    .post((req, res) => {
      debug(`usuario: ${req.body.usuario} - password: ${req.body.password}`);
      controller.validarUsuario(req.body.usuario, req.body.password, (status) => {
        if (status === true) {
          res.redirect('/contrato');
        } else {
          res.render('login', {
            navigation: navMenuLogin,
            opcionesMenuesModal: { 'modal-login': true, 'modal-error': true }
          });
        }
      });
    });
  */

  return loginRouter;
}

module.exports = cualquierNombre;
