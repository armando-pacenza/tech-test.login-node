const debug = require('debug')('LoginApp');
const passport = require('passport');

// const bodyParser = require('body-parser');
//
// Config necesaria para que el paquete body-parser parsee el body y genere el req.body
// necesario para recibir los json del PUT y el PATCH
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

//
// loginController implementa la funcion de cada respectivo metodo HTTP
// en el router que se usan como callback
//
function loginController() {
  //
  // Implementa las rutas de las paginas web
  //
  const navMenuLogin = [
    { name: 'Ingresar', link: '/login/sign-in', disabled: 'false' },
    { name: 'Salir', link: '/login/sign-out', disabled: 'true' }
  ];

  function getBarra(req, res) {
    // res.send( "Hola Mundo!!");  Esto manda un str directamente
    // res.sendFile(path.join(__dirname, '/views/index.html'));
    // path join arma path que para son compatibles windows, unix
    debug('entro a getBarra');
    res.render('login', {
      navigation: navMenuLogin,
      opcionesMenuesModal: { 'modal-login': false, 'modal-error': false }
    });
  }

  function getLoginSignIn(req, res) {
    debug('entro a getLoginSignIn');
    // navMenuLogin[0].disabled = 'false'; // prendo la opcion Login
    // navMenuLogin[1].disabled = 'true'; // apago la opcion Salir
    res.render('login', {
      navigation: navMenuLogin,
      opcionesMenuesModal: { 'modal-login': true, 'modal-error': req.query.status === 'invalido' }
    });
  }

  function postLoginSignIn() {
    debug('entro a postLoginSignIn');
    passport.authenticate('local', {
      successRedirect: '/contrato',
      failureRedirect: '/login/sign-in?status=invalido'
    });
  }

  function getLoginSignOut(req, res) {
    debug('entro a getLoginSignOut');
    req.logOut();
    // navMenuLogin[0].disabled = 'true'; // apago la opcion Login
    // navMenuLogin[1].disabled = 'false'; // prendo la opcion Salir
    res.render('login', {
      navigation: navMenuLogin,
      opcionesMenuesModal: { 'modal-login': false, 'modal-error': false }
    });
  }
  return {
    getBarra, getLoginSignIn, postLoginSignIn, getLoginSignOut
  };
}

module.exports = loginController;
