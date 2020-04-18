const app = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const hasher = require('./hasher');
app.use(bodyparser.json());

app.post('/login', async (req, res) => {
    let mailingre = req.body.user;
    let passingre = req.body.pass;
    console.log("user: "+mailingre + " pass: "+passingre);
    
    let datos = await sequelize.query('SELECT * FROM usuarios where email = ?',
    {replacements: [mailingre], type: sequelize.QueryTypes.SELECT}
).then(ress=>{
    return(ress);
});

if(datos[0]==null){
    res.status(400).send('error: Mail o contraseña incorrecto1');
}else if(datos[0].email!==mailingre){
    res.status(400).send('error: Mail o contraseña incorrecto2');
}else{
    let comprobacion = await hasher.testPass(datos[0].pass, passingre);
    if(comprobacion===true){
        console.log(datos[0]);
        let tosign = {
            "id": datos[0].id,
            "username": datos[0].username,
            "email": datos[0].email,
            "usertype": datos[0].usertype
          };
        let signed = await jwt.sign(tosign, firma);
    res.json(signed);}else{res.status(400).send('error: Mail o contraseña incorrecto3');}
    }    
});

module.exports = app;