const router = require('express').Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const sql = require('mysql2');

router.get('/*', async (req,res)=>{
    if(req.path=='/usuarios'||req.path=='/productos'||req.path=='/pedidos'||req.path=='/usuario'
    ||req.path=='/producto'||req.path=='/pedido'||req.path=='/pedidosxiduser'){
    const result = await getAll(req);
    if(result){
    res.json(result);}else{
        res.status(400).send('Error: Solicitud Incorrecta, no result');
    }}else{
        res.status(400).send('Error: Solicitud Incorrecta bad request');
    }
});

async function getAll(endpoints){
let datos;
let endpoint = endpoints.path;
let usuario =  await jwt.verify(endpoints.query.token, firma, function(err, user){
    if(err){res.status(401).send({error: 'Token inválido'})
    }else{return user;}
  });
if(endpoint=='/usuarios'){
datos = await sequelize.query('SELECT * FROM usuarios',
{type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(endpoint=='/usuario'){
    datos = await sequelize.query('SELECT * FROM usuarios where email = ?',
    {replacements: [endpoints.query.email], type: sequelize.QueryTypes.SELECT}
    ).then(res=>{
        return(res);
    });
return datos;
}else if(endpoint=='/productos'){
    datos = await sequelize.query('SELECT * FROM productos',
    {type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(endpoint=='/producto'){
    datos = await sequelize.query('SELECT * FROM productos where id = ?',
    {replacements: [endpoints.query.id], type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(endpoint=='/pedidos'){
    datos = await sequelize.query('SELECT * FROM pedidos',
    {type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(endpoint=='/pedido'){
    datos = await sequelize.query('SELECT * FROM pedidos where id = ?',
    {replacements: [endpoints.query.id], type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else if(endpoint=='/pedidosxiduser'){
    datos = await sequelize.query('SELECT * FROM pedidos where usuario = ?',
    {replacements: [endpoints.query.id], type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;
}else{
    return}
}

module.exports = router;