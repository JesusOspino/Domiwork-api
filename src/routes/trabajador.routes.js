const express = require('express');
const route = express.Router();
const trabajadorController = require('../controller/trabajador.controller');

route.get('/trabajador', trabajadorController.getTrabajadores);
route.get('/trabajador/:id', trabajadorController.getTrabajador);
route.get('/numero', trabajadorController.getNumeroTrabajadores);

route.post('/trabajador', trabajadorController.setTrabajador);

module.exports = route;
