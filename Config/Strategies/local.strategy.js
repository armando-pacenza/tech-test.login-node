// eslint-disable-next-line import/order
const debug = require('debug')('LoginApp');
const passport = require('passport');
const { Strategy } = require('passport-local');
const loginModel = require('../../Model/LoginModel')();

module.exports = function estrategiaLocal() {
  debug('entre a estrategiaLocal');
  passport.use(new Strategy(
    {
      usernameField: 'usuario',
      passwordField: 'password'
    }, (usuario, password, done) => {
      loginModel.findUser(usuario, (err, usr) => {
        if (err) {
          debug(`ha ocurrid0 un error al buscar usuario ${usr} - error: ${err.message}`);
          done(null, false);
          return;
        }
        if (usr[0] != null && usr[0].Password === password) {
          const user = {
            usuario,
            password
          };
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }
  ));
};
