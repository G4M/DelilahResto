const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const firma = 'DelilahResto';
const Sequelize = require('sequelize');
const sql = require('mysql2');

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

router.get('/', async (req,res)=>{
    res.json(await getAll(req.path));
});

module.exports = router;