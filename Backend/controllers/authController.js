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
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password,
        confirmed: false
      }
    });

    await newUser.save();

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash('test-hash', salt, function(err, hash) {
          var hashed_verifaction = hash;
          var host = req.get('host');
          console.log(host);
          link=`https://`+host+`/verify?id=`+hashed_verifaction;
          console.log(link);
          mailOptions={
            to:newUser.local.email,
            subject: 'confirm email',
            html: 'Confirm by pressing following link: <a href="'+link+'">'+link+'</a>'
          }
          console.log(mailOptions);
          smtpTransport.sendMail(mailOptions, function(err, response){
            if(err) throw err;

          })
        })
      })


    // Generate the token
    const token = signToken(newUser)

    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    //if(!req.user.confirmed)
    //  res.status(403).json({notconfirmed: 'Your account is not confirmed'})
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}
