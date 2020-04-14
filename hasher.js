const bcrypt = require('bcryptjs');

async function hash(pass){
    const salt = await bcrypt.genSalt(10);
    var data;
    let result = await bcrypt.hash(pass,salt).then(function(resultados){
        data = resultados;
    });
    return data;
}

async function testPass(pass, longhash){
    var data;
    let validacion = await bcrypt.compare(longhash, pass).then(function(resultados){
        data = resultados;
    });
    return data;
}

module.exports = {testPass, hash}