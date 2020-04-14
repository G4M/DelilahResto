const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
server.listen(3000, () => {console.log("Se Inicio el Servidor en el puerto 3000");});
server.use(bodyparser.json());

//Importacion de Funciones
const gettersRoute = require('./getters');
const login = require('./jwt');

//Implementación de endpoints
server.use('/get', gettersRoute);
server.use('/api', login);


/*
async function createUser(username, fullname, email, tel, adress, pass){
    let datos = await sequelize.query('INSERT INTO usuarios VALUES(null, ?, ?, ?, ?, ?, ?)',
    {replacements: [username, fullname, email, tel, adress, pass]})
    .then(function(resultados){
        console.log(resultados);
    })
}

server.post('/newUser', async(req,res)=>{
    if(!req.query.username || !req.query.fullname || !req.query.email || !req.query.tel || !req.query.adress || !req.query.pass){
        res.status(500).send('error: Faltan parametros');
    }
    createUser(req.query.username, req.query.fullname, req.query.email, req.query.tel, req.query.adress, req.query.pass);
    res.send("Usuario registrado");
});

server.post('/login',(req,res)=>{
    const { usuario, contrasena} = req.body
    const validado = validarUser(usuario, contrasena)

    if(validado==false){
        res.json({error: 'Usuario o contraseña incorrecta'});
        return;
    }
    const token = jwt.sign({
        usuario
    }, firma);
    res.json({token});
});

function validarUser(usuario, contrasena){
    console.log("User y pass: "+usuario+ " " + contrasena);
    return true;
}
*/