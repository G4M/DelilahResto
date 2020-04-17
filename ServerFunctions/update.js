const update = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const hasher = require('./hasher');
update.use(bodyparser.json());

update.patch('/pedidos', async(req,res)=>{
    //verificacion de token
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
        console.log("el permiso es: "+permiso);
        console.log("id_pedido: " + req.body.id_pedido);
        console.log("Estado: "+ req.body.estado);
    //verificacion de parametros recibidos
    
    
    if(permiso!==true||!req.body.id_pedido||!req.body.estado){
        res.status(500).send('Error: Faltan o hay parametros erroneos');
}else if(req.body.estado=='NUEVO'||req.body.estado=='CONFIRMADO'||
req.body.estado=='PREPARANDO'||req.body.estado=='ENVIANDO'||
req.body.estado=='CANCELADO'||req.body.estado=='ENTREGADO'){
    let datosupdate = await sequelize.query('UPDATE pedidos set estado = ? where id = ?',
    {replacements: [req.body.estado, req.body.id_pedido]})
    .then(function(resultados){
        return resultados;
    });
    res.status(201).send('Pedido Modificado Correctamente');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});
    //

module.exports = update;