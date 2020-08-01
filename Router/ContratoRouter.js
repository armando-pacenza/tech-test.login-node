const express = require('express');

const contratoRouter = express.Router();

function cualquierNombre(controller) {
  contratoRouter.route('/contrato')
    .all(controller.all)
    .get(controller.get);

  return contratoRouter;
}

module.exports = cualquierNombre;
