const debug = require('debug')('LoginApp');
const passport = require('passport');
require('./Strategies/local.strategy')();

module.exports = function passportConfig(app) {
  debug('entre a passportConfig');
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
