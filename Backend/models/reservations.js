'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
    enum: ['MakerSpace', 'OpenSpace','Lab', 'WholeSpace'],
    required: true
  }
};


module.exports = mongoose.model('Reservation', ReservationSchema);
