'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReservationSchema = {
  startDate: {
    type: Date,
    required: false
   },
  endDate: {
    type: Date,
    required: false
   },
  numOfPeople: {
    type: Number,
    required: false,
    min: 0,
    max: 12
  },
  option: {
    type: String,
    enum: ['MakerSpace', 'OpenSpace','Lab', 'WholeSpace'],
    required: false
  }
};

module.exports = mongoose.model('Reservation', ReservationSchema);
