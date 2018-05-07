var mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var Shema = mongoose.Schema;

var UserSchema = {
  local: {
    email: {
      type: String,
      min: 1,
      max: 32
    },
    email_hash: String,
    password: {
      type: String,
      min: 8,
      max: 24
    },
    name: String,
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
}

module.exports = mongoose.model("User", UserSchema);
