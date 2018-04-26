var express = require('express');
var router = express.Router();

var Reservation = require('../models/reservations');
var Device = require('../models/device');
//var device_controller = require('../controllers/deviceController.js');
var mongoose = require('mongoose');

router.route('/')
.get(function(req, res){
  Reservation.find(function(err, reservations){
    if(err){res.send(err)}
    res.json(reservations)
  });
})
.post(function(req, res){
  var reservation = new Reservation();
  (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
  (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
  (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
  (req.body.option) ? reservation.option = req.body.option : null;
  (req.body.deviceId) ? reservation.device=req.body.device: null;

  reservation.save(function(err, result){
    if(err) { res.send(err); }
    res.json(result);
  });
});

router.route('/:reservation_id')
  .put(function(req, res) {
    Reservation.findById(req.params.reservation_id, function(err, reservation) {
      if (err) {  res.send(err); }
      (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
      (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
      (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
      (req.body.option) ? reservation.option = req.body.option : null;
     reservation.save(function(err) {
        if (err)
          res.send(err);
        res.json({message: 'reservations has been updated'});
      });
    });
  })
  .delete(function(req, res) {
    Reservation.remove({ _id: req.params.reservation_id }, function(err, reservation){
      if (err)
        res.send(err);
      res.json({ message: 'reservation has been deleted' })
    })
});

module.exports = router;
