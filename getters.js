const router = require('express').Router();
const bodyparser = require('body-parser');
router.use(bodyparser.json());
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/delilahresto');
const sql = require('mysql2');

router.get('/*', async (req,res)=>{
    console.log(req);
    const result = await getAll(req.path);
    if(result){
    res.json(result);}else{
        res.status(400).send('Error: Solicitud Incorrecta')
    }
});

async function getAll(endpoint){
let datos;
if(endpoint=='/usuarios'){
datos = await sequelize.query('SELECT * FROM usuarios',
{type: sequelize.QueryTypes.SELECT}
).then(res=>{
    return(res);
});
return datos;}
else if(endpoint=='/productos'){
    datos = await sequelize.query('SELECT * FROM productos',
    {type: sequelize.QueryTypes.SELECT}
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
}else{
    return}
}

module.exports = router;