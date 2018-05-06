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
    password: {
      type: String,
      min: 8,
      max: 24
    },
    name: String,
    validated: Boolean,
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
