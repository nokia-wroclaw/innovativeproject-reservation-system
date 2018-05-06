var User = require('../models/users')
var bcrypt = require('bcrypt')
var passport = require('passport')
const jwt      = require('jsonwebtoken');
var nodemailer = require('nodemailer')

require('dotenv').config('./');

const saltRounds = 10;

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'norbert.kia.test.no.reply@gmail.com',
    pass: 'norbertkia1!'
  },
  tls: {
    rejectUnauthorized: false
  }
});

function EmailController(email){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(mailformat)){
    return true;
  }
  console.log("invalid mail");
  return false;
}

function PasswordController(pwd){  //TODO minimal characters should be 8
  if(pwd.length > 7 && pwd.length < 33){
    return true;
  }
  else {
    console.log('invalid pwd');
    return false
  };
}

exports.user_get = function(req, res){
  User.find(function(err, users){
    if(err){res.send(err)}
    res.json(users)
  });
}

exports.user_get_details = function(req, res) {
  User.findById(req.params.user_id, function(err, user){
    if(err) {return res.send(err)}
    res.json(user)
  })
}

exports.user_post = function(req, res){
    var user = new User()

    if(EmailController(req.body.email))  {
        user.local.email = req.body.email
    }
    else{
      return res.send('invalid email')
    }
    user.local.isAdmin = false;
    user.email = req.body.email
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(PasswordController(req.body.password)){
        user.local.password = req.body.password;
      }
      else{return res.send('invalid password')}
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        user.local.password = hash;
        user.save(function(err, result){
          if(err) {return err}
          res.send(result)
        })
      })
    })

    // setup email data with unicode symbols
    let mailOptions = {
        from: '<nokia.kia.test.no.reply@gmail.com>', // sender address
        to: user.local.email, // list of receivers
        subject: 'Nokia Garage- verify your email', // Subject line
        text: 'Click the following link to verify your account', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

exports.user_fb_post = function(req, res){
  var user = new User()
  User.findOne({'facebook.id': req.body.id}, function(err, result){
    if(err) {return err}
    if(result){
      return console.log('already in database');
    }
    else{
      user.facebook.email = req.body.email
      user.facebook.name = req.body.name
      user.facebook.id = req.body.id
      user.save(function(error, founduser){
        if(error){throw error}

        req.login(founduser, function(e){console.log('logged in');})
        res.send(founduser)
      })
    }
  })
}

exports.user_fb_login = function(req, res){
  passport.authenticate('facebook', {session: false}, (err,user,info)=>{
    console.log(err);
    if(err||!user){
      return res.status(400).json({
        message: info?info.message:'login failed',
        user:user
      });
    }
    req.login(user,{session:false}, (err)=>{
      if(err) {return res.send(err)}
      const token = jwt.sign(user, 'secret');
      return res.json({user,token})
    })

  })
}

exports.user_update = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    user.local.name = req.body.name;
    user.local.email =  req.body.email;

    user.save((err, result) =>{
      if(err) {return err;}
      res.send(result)
    })
  })
}
