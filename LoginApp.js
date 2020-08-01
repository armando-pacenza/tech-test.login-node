const express = require('express');
const debug = require('debug')('LoginApp');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Para crear un servidor https
const fs = require('fs');
const https = require('https');

const app = express();
module.exports = app;

const port = process.env.PORT || 3200;
app.use(morgan('tiny')); // 'combined' da mas informacion

//
// se incluye este paquete necesario para el parseo del body cuando se reciben los post
//
app.use(bodyParser.urlencoded({ extended: true }));

//
// Seteos para usar passport
//
app.use(cookieParser());
app.use(session({ secret: 'Viva la santa federacion mueran los salvajes unitarios' }));
require('./Config/passport.js')(app);

//
// Setea el ditectorio desde donde obtiene las views y el view engine para que devuelva paginas ejs
//
app.set('views', './views');
app.set('view engine', 'ejs');

//
// Busca cualquier pagina, css o js en el dir public
//
app.use(express.static(path.join(__dirname, '/public')));

// Se incorporan estas directivas para que busque los css y js de bootstrap
// y jquery en el dir node-module
//
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

//
// Se trata de implementar el patron MVC
//
// En el directorio Model esta el modelo que implementan todas las funciones relacionadas
// con la persistencia de la Entidad Login sobre una base mysql
//
// En el directorio Controller se deja la implementacion de los callbacks de cada uno de los
// metodos HTTPS.
//
// En el view se ponen todas las paginas ejs.
//
//  Por ultimo en el directorio router se mapea las rutas con los callbacks expuestos
// por el modulo controller.
//
const loginController = require('./Controller/LoginController')();
const contratoController = require('./Controller/ContratoController')();
const loginRouter = require('./Router/LoginRouter')(loginController);
const contratoRouter = require('./Router/ContratoRouter')(contratoController);

app.use('/', contratoRouter);
app.use('/', loginRouter);

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(port, () => {
  debug(`Https server listening on port ${port}...`);
});

/*
* Version para implementar http.
*

app.listen(port, () => {
  debug(`Listening en el port ${port}`);
});
*/
module.exports = app;
