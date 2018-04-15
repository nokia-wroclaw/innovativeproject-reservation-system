
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DeviceSchema = new Schema ( {
  name: {
    type: String,
    required: true,
    max: 30,
  },
  numLeft: {
    type: Number,
     min: 0,
     required: true
  }
});

DeviceSchema.virtual('device_name').get(function() {
  return this.name;
});

DeviceSchema
.virtual('url')
.get(function(){
  return '/api/devices/'+ this._id;
});

module.exports = mongoose.model('Device', DeviceSchema);
