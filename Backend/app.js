
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Device = require('./models/device');
var secrets = require('./secrets');

var deviceRoute = require('./routes/deviceRoute');
var reservationRoute = require('./routes/reservationsRoute');
var reservationMiddleware = require('./controllers/Middleware/reservationMiddleware')

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(reservationMiddleware.CheckTime)
//app.use(reservationMiddleware.ReturnEndReservations)
//app.use(reservationMiddleware.SaveEndCondition)

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

app.use('/api/devices', deviceRoute);
app.use('/api/reservations', reservationRoute);



module.exports = app;
