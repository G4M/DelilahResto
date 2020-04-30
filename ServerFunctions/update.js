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

update.patch('/productos', async(req,res)=>{
    //verificacion de token
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
    //verificacion de parametros recibidos
    if(permiso!==true||!req.body.id||!req.body.campo||!req.body.valor){
        res.status(500).send('Error: Faltan o hay parametros erroneos');
}else if(req.body.id && (req.body.campo=='nombre'||req.body.campo=='precio'||req.body.campo=='urlimagen') && req.body.valor){
    let datosupdate = await sequelize.query('UPDATE productos set '+ req.body.campo +' = ? where id = ?',
    {replacements: [req.body.valor, req.body.id]})
    .then(function(resultados){
        return resultados;
    });
    res.status(201).send('Producto Modificado Correctamente');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});

update.patch('/usuarios', async(req,res)=>{
    //verificacion de token
    if(!req.query.token){res.status(400).send('Error: Solicitud Incorrecta Token');}
        let usuario =  await jwt.verify(req.query.token, firma, function(err, user){
            if(err){res.status(401).send({error: 'Token inválido'})
            }else{return(user);}
          });
        let permiso = (usuario.usertype==='admin');
    //verificacion de parametros recibidos
    if(permiso!==true||!req.body.id||!req.body.campo||!req.body.valor){
        res.status(500).send('Error: Faltan o hay parametros erroneos');
}else if(req.body.id && (req.body.campo=='username'||req.body.campo=='fullname'||req.body.campo=='tel'||req.body.campo=='adress') && req.body.valor){
    let datosupdate = await sequelize.query('UPDATE usuarios set '+ req.body.campo +' = ? where id = ?',
    {replacements: [req.body.valor, req.body.id]})
    .then(function(resultados){
        return resultados;
    });
    res.status(201).send('Usuario Modificado Correctamente');
}else{
    res.status(500).send('error: Faltan o hay parametros erroneos');
}});

update.patch('/newAdmin', async (req, res) => {
    if (!req.query.token) { res.status(400).send('Error: Solicitud Incorrecta Token'); }
    let usuario = await jwt.verify(req.query.token, firma, function (err, user) {
        if (err) {
            res.status(401).send({ error: 'Token inválido' })
        } else { return (user); }
    });
    let permiso = (usuario.usertype === 'admin');
    if (permiso !== true) {
        res.status(500).send('Error: El usuario no tiene permisos para la acción que desea realizar');
    }
    else if (!req.body.id) {
        res.status(501).send('Error: Faltan parametros');
    }
    else {
        let datosproducto = await sequelize.query('UPDATE usuarios set usertype = "admin" where id = ?',
            { replacements: [req.body.id] })
            .then(function (resultados) {
                res.status(201).send('Se han cocedido permisos de Administrador al usuario id: '+req.body.id);
            });
    }

});

module.exports = update;