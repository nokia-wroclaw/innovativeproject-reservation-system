const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../config/auth');
var nodemailer = require('nodemailer')

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'norber.kia.test.no.reply@gmail.com',
    pass: process.env.EMAIL_PWD
  }
});

var rand, mailOptions, host, link

signToken = user => {
  return JWT.sign({
    iss: 'reservation-secret',
    sub: [user.id, user.local.email, user.local.name, user.local.isAdmin],
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next, {transporter, models, EMAIL_SECRET}) => {

    // Generate the token
    const token = signToken(newUser)

    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    User.findOne({'local.email': req.body.email}, (err, foundUser)=>{
      if(foundUser.local.confirmed){
        const token = signToken(req.user);
        res.status(200).json({ token });
      }
      else{
          res.status(403).json({notconfirmed: 'Your account is not confirmed'})
      }
    })
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}
