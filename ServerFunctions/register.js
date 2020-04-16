const register = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const hasher = require('./hasher');
register.use(bodyparser.json());

register.post('/pedidos', async(req,res)=>{
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Falta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
    if(!req.body.pedido || !usuario){res.status(400).send('Error: Solicitud Incorrecta Faltan parametros');}
    let articulos = req.body.pedido;
   
    if(!articulos.length>0){res.status(400).send('Error: Solicitud Incorrecta en formato de pedido');}
    else{
    let datospedido = await sequelize.query('INSERT INTO pedidos VALUES(null, ?, ?, ?, ?)',
    {replacements: ['pendiente', "current_timestamp()", 'pendiente', usuario.id]})
    .then(function(resultados){
        console.log(resultados);
        return resultados;
    });
    for(let i=0; i<articulos.length; i++){
        let datosproductos = await sequelize.query('INSERT INTO productosxpedidos VALUES(null, ?, ?)',
    {replacements: [datospedido[0], articulos[i]]})
    .then(function(resultados){
        return resultados;
    });
    }
    res.status(201).send('El pedido se registro correctamente');
    }
});
   /*
    let datosproductos = await sequelize.query('INSERT INTO productosxpedidos VALUES(null, ?, ?, ?, ?, ?, ?)',
    {replacements: [usuario.id]})
    .then(function(resultados){
        console.log("pedido registrado" + resultados);
    });
    */
// del token se obtiene id de usuario y en el req.query debe enviar los datos para el registro del pedido
// primero se debe registrar el pedido para obtener el id y luego con ese id pegarle a la tabla productosxpedidos

// INSERT into pedidos VALUES(null, 'pendiente', 'current_timestamp()', 'pendiente', usuario.id)
// SELECT MAX(id) from pedidos
// INSERT INTO productosxpedidos VALUES(null, 3, 3)


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
        //console.log(resultados);
    })
}
//funcion que comprueba si existe usuario o email en la base de datos
//devuelve true si no existen o un string correspondiente al error
async function comprobacion(username, email){
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