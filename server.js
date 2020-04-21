const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');

server.listen(3000, () => {console.log("Se Inicio el Servidor en el puerto 3000");});
server.use(bodyparser.json());

//Importacion de Funciones
const gettersRoute = require('./ServerFunctions/getters');
const login = require('./ServerFunctions/login');
const register = require('./ServerFunctions/register');
const update = require('./ServerFunctions/update')

//endpoints
server.use(cors());
server.use('/get', gettersRoute);
server.use('/api', login);
server.use('/register', register);
server.use('/update', update);