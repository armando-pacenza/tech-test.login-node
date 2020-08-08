/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */

const debug = require('debug')('LoginApp');
const mysql = require('mysql');
const chalk = require('chalk');

function loginModel() { // loginModel es un nombre interno solo se usa en el module.exports
  function getMysqlConnection(callbackResult) {
    const mySqlPort = process.env.MYSQL_PORT || 3306;
    const mySqlHost = process.env.MYSQL_HOST || 'localhost';
    const mySqlUser = process.env.MYSQL_USER;
    const mySqlPassword = process.env.MYSQL_PASSWORD;
    const mySqlDatabase = process.env.MYSQL_DATABASE;
    const connection = mysql.createConnection({
      port: mySqlPort,
      host: mySqlHost,
      user: mySqlUser,
      password: mySqlPassword,
      database: mySqlDatabase
    });

    connection.connect((err) => {
      if (err) {
        debug(chalk.bgRed.black('ERROR en connect: ') + err.message);
        const error = err;
        error.httpStatus = 500;
        callbackResult(error, null);
        return;
      }
      debug('Connected to Database Ok.');
    });

    return connection;
  }

  function closeMysqlConnection(connection) {
    connection.end((err) => {
      if (err) {
        debug(chalk.bgRed.black('ERROR:') + err.message); // error en cierre de conexion informo por consola y devuelvo el resultado.
        return;
      }
      debug('Close the database connection.');
    });
  }

  function executeSql(sql, params, callbackResult) {
    const connection = getMysqlConnection(callbackResult);

    connection.query(sql, params, (err, results, fields) => {
      if (err) {
        debug(`ERROR: ${err.message}`);
        const error = err;
        error.httpStatus = 400;
        closeMysqlConnection(connection);
        callbackResult(err, null);
        return;
      }

      debug('*******');
      debug(results);
      debug('*******');

      connection.end((error) => {
        if (err) {
          debug(chalk.bgRed.black('ERROR:') + error.message); // error en cierre de conexion informo por consola y devuelvo el resultado.
          return;
        }
        debug('Close the database connection.');
      });

      callbackResult(null, results);
    });
  }

  //
  //  findByNroFactura:
  //  Funcion que recibe nro de factura, consulta a la BD y llama a la func de  callback.
  //
  function findUser(usuario, callbackResult) {
    const sql = `SELECT 
      Password,
      Status, 
      CantReintentos
    
        FROM Usuarios WHERE Usuario = ?`;
    
    executeSql(sql, usuario, (err, data) => {
      callbackResult(err, data);
    });
  }

  // eslint-disable-next-line object-curly-newline
  return { findUser };
}

module.exports = loginModel;
