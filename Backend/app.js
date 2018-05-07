
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Device = require('./models/device');
var passport = require('passport')
var session = require('express-session')
var deviceRoute = require('./routes/deviceRoute');
var reservationRoute = require('./routes/reservationsRoute');
var userRoute = require('./routes/usersRoute')
//var facebookRoutes = require('./routes/facebookRoutes')
var cookieParser = require('cookie-parser')
var authRoutes = require('./routes/authRoute')
//var authRoutes = require('./routes/authRoute')
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(session({
  secret: 'secret-reservation',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session())

//require('./config/facebookPassport')(passport)
//require('./config/twitterPassport')(passport)

//var require('./routes/facebookRoutes')(app, passport)
//require('./routes/twitterRoutes')(app, passport)

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api/devices', deviceRoute);
app.use('/api/reservations', reservationRoute);
app.use('/api/users', userRoute);
//app.use('/api/auth/facebook', facebookRoutes)
app.use('/api', authRoutes)

module.exports = app;
