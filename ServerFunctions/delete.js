const deleter = require('express').Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const sequelize = require('./mysequelize');
deleter.use(bodyparser.json());

deleter.delete('/usuario', async(req,res)=>{
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
    if(permiso!==true||!req.query.id){
        res.status(500).send('Error: No tiene permisos para realizar la acción requerida / Faltan parametros');
}else if(req.query.id){
    let datosdelete = await sequelize.query('DELETE FROM usuarios where id = ?',
    {replacements: [req.query.id]})
    .then(function(resultados){
        return resultados;
    });
    res.status(201).send('Usuario Eliminado');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});

deleter.delete('/pedido', async(req,res)=>{
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
    if(permiso!==true||!req.query.id){
        res.status(500).send('Error: No tiene permisos para realizar la acción requerida / Faltan parametros');
}else if(req.query.id){
    let datosdelete = await sequelize.query('DELETE FROM pedidos where id = ?',
    {replacements: [req.query.id]})
    .then(function(resultados){
        console.log(resultados);
    });
    let pedidodelete = await sequelize.query('DELETE FROM productosxpedidos WHERE id_pedido = ?',
    {replacements: [req.query.id]})
    .then(function(ress){
        console.log(ress);
    });
    res.status(201).send('Pedido Eliminado');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});

deleter.delete('/producto', async(req,res)=>{
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
    if(permiso!==true||!req.query.id){
        res.status(500).send('Error: No tiene permisos para realizar la acción requerida / Faltan parametros');
}else if(req.query.id){
    let datosdelete = await sequelize.query('DELETE FROM productos where id = ?',
    {replacements: [req.query.id]})
    .then(function(resultados){
        return resultados;
    });
    res.status(201).send('Producto Eliminado');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});

module.exports = deleter;