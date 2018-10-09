var userController = require('../controllers').user;
var deviceController = require('../controllers').device;
var express = require('express');
var app = express();

app.get('/user', userController.listAll);
app.get('/user/collection/:name', userController.collectionUser);
app.post('/user', userController.create);
app.post('/login', userController.login);
app.put('/user/:id', userController.update);
app.delete('/user/:id', userController.updateStatus);

app.get('/device', deviceController.listAll);
app.get('/device/collection/:name', deviceController.collectionDevice);
app.post('/device', deviceController.create);
app.put('/device/:id', deviceController.update);
app.delete('/device/:id', deviceController.updateStatus);

module.exports = app;