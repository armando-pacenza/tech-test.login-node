const debug = require('debug')('LoginApp');
const path = require('path');

//
// contratoController implementa la funcion de cada respectivo metodo HTTP en el router
// que se usan como callback
//
function contratoController() {
  function all(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  function get(req, res) {
    debug(`dirname ${__dirname}`);
    res.sendFile(path.join(`${__dirname}/../views/`, 'contratos.html'));
  }
  return {
    all, get
  };
}

module.exports = contratoController;
