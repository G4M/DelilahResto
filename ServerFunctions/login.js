const app = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const hasher = require('./hasher');
//app.listen(3000, () => console.log('Server started on port 3000'));
app.use(bodyparser.json());

app.post('/login', async (req, res) => {
    let mailingre = req.body.user;
    let passingre = req.body.pass;
    let tosign = {"mail" : mailingre};
    let signed = await jwt.sign(tosign, firma);
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
    res.json(signed);}else{res.status(400).send('error: Mail o contraseña incorrecto3');}
    }    
});

module.exports = app;