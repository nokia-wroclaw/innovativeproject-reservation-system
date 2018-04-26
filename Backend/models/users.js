var mongoose = require('mongoose')

var Shema = mongoose.Schema;

var UserSchema = {
  email: {
    type: String,
    required: true,
    min: 1,
    max: 32
  },
  password: {
    type: String,
    required: true,
    min: 1,
    max: 64
  }
}

module.exports = mongoose.model("User", UserSchema);
