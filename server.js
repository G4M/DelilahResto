const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
server.listen(3000, () => {console.log("Se Inicio el Servidor en el puerto 3000");});
server.use(bodyparser.json());

//Importacion de Funciones
const gettersRoute = require('./ServerFunctions/getters');
const login = require('./ServerFunctions/login');
const register = require('./ServerFunctions/register');

//Implementación de endpoints
server.use('/get', gettersRoute);
server.use('/api', login);
server.use('/register', register);