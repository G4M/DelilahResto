
const express = require('express');
const server = express();
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
server.listen(3000, () => {
    console.log("se ha iniciado el server");
});


async function getAll(table){
let datos;
console.log(table);
if(table=='/usuarios'){
datos = await sequelize.query('SELECT * FROM usuarios',
{type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;}
else if(table=='/productos'){
    datos = await sequelize.query('SELECT * FROM productos',
    {type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(table=='/pedidos'){
    datos = await sequelize.query('SELECT * FROM pedidos',
    {type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else{
    return (res.status(500).send('Error: Algo Salio Mal'))}
}
//CRUD: Create , Read, Update, Delete

async function createUser(username, fullname, email, tel, adress, pass){
    //INSERT INTO albumes VALUES(null, "El Tesoro De Los Inocentes", 1, '2004-12-01')
    let datos = await sequelize.query('INSERT INTO usuarios VALUES(null, ?, ?, ?, ?, ?, ?)',
    {replacements: [username, fullname, email, tel, adress, pass]})
    .then(function(resultados){
        console.log(resultados);
    })
}

server.get('/usuarios', async (req,res)=>{
        res.json(await getAll(req.path));
    });
server.get('/productos', async (req,res)=>{
    res.json(await getAll(req.path));
});
server.get('/pedidos', async (req,res)=>{
    res.json(await getAll(req.path));
});

server.post('/newUser', async(req,res)=>{
    if(!req.query.username || !req.query.fullname || !req.query.email || !req.query.tel || !req.query.adress || !req.query.pass){
        res.status(500).send('error: Faltan parametros');
    }
    createUser(req.query.username, req.query.fullname, req.query.email, req.query.tel, req.query.adress, req.query.pass);
    res.send("Usuario registrado");
});
