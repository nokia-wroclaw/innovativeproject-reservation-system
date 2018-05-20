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
  User.find({},'-local.password', function(err, users){
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

exports.user_post = function(req, res) {
  var user = new User()
  if (EmailController(req.body.email)) {
    user.local.email = req.body.email
  } else {
    return res.send('invalid email')
  }
  user.local.isAdmin = false;
  user.local.name = req.body.name
  user.local.lastname = req.body.lastname
  user.local.phonenumber = req.body.phonenumber
  user.local.origin = req.body.origin
  user.local.organization = req.body.organization
  user.email = req.body.email
  if (PasswordController(req.body.password)) {
    user.local.password = req.body.password;
  } else {
    return res.send('invalid password')
  }
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.email, salt, function(e, email_hash) {
      user.local.email_hash = email_hash

      user.save((err, result) => {
        if (err) {
          return err
        }
        const host = req.host;
        if (host === 'localhost') {
          link = `http://` + host + `:3000/verify/` + email_hash;
        } else {
          link = `http://` + host + `/verify/` + email_hash;
        }
        mailOptions = {
          from: '<nokia,kia.test.no.reply@gmail.com',
          to: user.local.email,
          subject: 'Nokia Garage- verify your email',
          html: 'Confirm by pressing following link: <a href="' + link + '">' + link + '</a>'
        }
        smtpTransport.sendMail(mailOptions, function(error_mail, response) {
          if (error_mail) throw error_mail;
        })

        return res.send({
          error: false,
          result
        })
      })

    })
  })
}

exports.user_verify = function(req, res) {
  User.findOne({'local.email_hash': req.params.email_hash }, function(err, user) {
    if(err) {return res.send(err)}
    res.send('email confirmed')
    const confirmation = {
      confirmed: true
    }
    user.local.confirmed = confirmation.confirmed;
    user.save(error=>{if(err) return res.send(err)})
  })
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
