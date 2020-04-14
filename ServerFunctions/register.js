const register = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const hasher = require('./hasher');
register.use(bodyparser.json());

register.post('/newUser', async(req,res)=>{

    if(!req.body.username || !req.body.fullname || !req.body.email || !req.body.tel || !req.body.adress || !req.body.pass){
        res.status(500).send('error: Faltan parametros');
    }
    let comprobante = await comprobacion(req.body.username, req.body.email);
    if(comprobante===true){
        let passhash = await hasher.hash(req.body.pass)
    createUser(req.body.username, req.body.fullname, req.body.email, req.body.tel, req.body.adress, passhash);
    res.status(201).send("Usuario registrado");}
    else{res.status(400).send(comprobante);}
});

async function createUser(username, fullname, email, tel, adress, pass){
    let datos = await sequelize.query('INSERT INTO usuarios VALUES(null, ?, ?, ?, ?, ?, ?)',
    {replacements: [username, fullname, email, tel, adress, pass]})
    .then(function(resultados){
        console.log(resultados);
    })
}

//funcion que comprueba si existe usuario o email en la base de datos
//devuelve true si no existen o un string correspondiente al error
async function comprobacion(username, email){
    console.log("user recived: "+username);
    console.log("email recived: "+email);
    let mailok;
    let userok;
    let datos = await sequelize.query('SELECT * FROM usuarios where email = ?',
    {replacements: [email], type: sequelize.QueryTypes.SELECT}
).then(res=>{
    if(res[0]==null){mailok=true}else{mailok=false}
    return
});
if(mailok===true){
    let datos2 = await sequelize.query('SELECT * FROM usuarios where username = ?',
    {replacements: [username], type: sequelize.QueryTypes.SELECT}
).then(ress=>{
    if(ress[0]==null){userok=true}else{userok=false}
    return
});}else{return("Mail ya registrado");}
if(userok===false){return("Usuario ya registrado")}else{return true}
}

module.exports = register;