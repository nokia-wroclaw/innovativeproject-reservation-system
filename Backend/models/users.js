var mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  local: {
    email: {
      type: String,
      min: 1,
      max: 32
    },
    phonenumber: {
      type: String,
      min: 1
    },
    organization: {
      type: String
    },
    origin: {
      type: String,
      enum: ['individual', 'startup', 'company', 'other'],
    },
    email_hash: String,
    password: {
      type: String,
      min: 8,
      max: 24
    },
    name: String,
    lastname: String,
    confirmed: {
      type: Boolean,
      default: false
    },
    isAdmin: Boolean
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    email: String,
    name: String
  }
})

UserSchema.pre('save', function(next){
  var user = this.local;
  bcrypt.genSalt(10, function(s_err, salt){
    if(s_err) return next(s_err)
    bcrypt.hash(user.password, salt, function(h_err, hash) {
      if(h_err) return next(h_err)
      user.password = hash;
      next();
    })
  })
})

module.exports = mongoose.model("User", UserSchema);
