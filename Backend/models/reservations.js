'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Device =  require('./device')

var ReservationSchema = {
  startDate: {
    type: Date,
    required: true
   },
  endDate: {
    type: Date,
    required: true
   },
  numOfPeople: {
    type: Number,
    required: true,
    min: 0,
    max: 12
  },
  personName: {
    type: String,
    required: true
  },
  option: {
    type: String,
    enum: ['MakerSpace', 'CreativeSpace', 'WholeSpace'],
    required: true
  },
  deviceList: [{
    quantity: Number,
    usedDevices: {
      type: Schema.Types.ObjectId,
      ref: 'DeviceSchema'
    }
  }]
};


module.exports = mongoose.model('Reservation', ReservationSchema);
