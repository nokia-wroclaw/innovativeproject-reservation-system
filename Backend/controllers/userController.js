var User = require('../models/users')
var bcrypt = require('bcrypt')
const saltRounds = 10;

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
  user.email = req.body.email
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      user.password = hash;
      user.save(function(err, result){
        if(err) {return err}
        res.send(result)
      })
    })
  })
}
