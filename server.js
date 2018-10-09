var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
process.env.PORT = process.env.PORT || 3000;
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

app.use(bodyParser.urlencoded({
    limit: '200mb',
    extended: true,
    parameterLimit: 50000
}));

app.use(bodyParser.json({
    limit: '200mb'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require('./routes'));

app.listen(process.env.PORT, () => {
    console.log(`Listening in the port: ${process.env.PORT}`);
});