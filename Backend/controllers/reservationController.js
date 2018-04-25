var Reservation = require('../models/reservations');
//var express = require('express')
//var app = express();


var reservationMiddleware = require('./Middleware/reservationMiddleware')

//app.use(reservationMiddleware.CheckTime)

//GET reservation
exports.reservation_get = function(req, res){
  Reservation.find(function(err, reservations){
    if(err){return res.send(err)}
    res.json(reservations)
  });
}

exports.reservation_details_get = (function(req, res) {
  Reservation.findById(req.params.reservation_id, function(err, reservation){
    if(err) {return res.send(err);}
    res.json(reservation);
  });
})

//POST reservation
var maxGuests = 12;
var maxHours = 8;

exports.reservation_post = function(req, res, reservationMiddleware){
  var reservation = new Reservation();
  (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
  (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
  (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
  (req.body.option) ? reservation.option = req.body.option : null;
  (req.body.personName) ? reservation.personName = req.body.personName : null;

  var queries = [
    //end condition - ✓
    {$lt: reservation.startDate},
    {$gt: reservation.startDate, $lt: reservation.endDate},
    //start condition - triggers also in - works alone
    {$gt: reservation.startDate, $lt: reservation.endDate},
    {$gt: reservation.endDate},
    //in condition - triggers also start - also work for start
    {$lte: reservation.startDate},
    {$gte: reservation.endDate},
    //out condition - triggers also end
    {$gte: reservation.startDate},
    {$lte: reservation.endDate},
  ];

  var query = [
    Reservation.find({"startDate": queries[0], "endDate": queries[1]}).exec(),
    Reservation.find({"startDate": queries[2], "endDate": queries[3]}).exec(),
    Reservation.find({"startDate": queries[4], "endDate": queries[5]}).exec(),
    Reservation.find({"startDate": queries[6], "endDate": queries[7]}).exec()
  ];
  function isNumberOfPeopleOkay(results, reservation){
    const numberofpeople = results.map(item=>item.numOfPeople)
    const maxnumberofpeople = Math.max(...numberofpeople, 0)

    if( maxnumberofpeople + reservation.numOfPeople > maxGuests){
      return 'Reservation cannot be submited because there are more than ' + maxGuests + ' people (There would be ' + (maxnumberofpeople+reservation.numOfPeople) + ')'
    }
    return ''
  }

  function isOver8Hours(results, reservation){
    const timeDifference = Math.abs(reservation.endDate - reservation.startDate)/3600000;
    if(timeDifference > maxHours){
      return 'Single reservation cannot be longer than 8 hours. Currently ' + timeDifference + 'h'
    }
    return ''
  }

  function Query(){
    return Promise.all(query)
      .then(results=>{
        return results.reduce((acc, item)=>{
          return [...acc,...item];
        },[])
      })
      .then(allresults=>{
        return  [
          isOver8Hours(allresults, reservation),
          isNumberOfPeopleOkay(allresults, reservation)
        ].filter(item => item !== '')
      })
  }

  Query()
    .then((errors) => {
      if(errors.length === 0){
       reservation.save(function(err, newreservation){
          if(err) { return res.send(err); }
          res.json({reservation: newreservation, error: false});
        });
      }
      else {
        res.json({error: true, errors})
      }
    })

}

//PUT reservation
exports.reservation_put = function(req, res) {
  Reservation.findById(req.params.reservation_id, function(err, reservation) {
    if (err) {  res.send(err); }
    (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
    (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
    (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
    (req.body.option) ? reservation.option = req.body.option : null;
    (req.body.personName) ? reservation.personName = req.body.personName : null;

   reservation.save(function(err) {
      if (err)
      { return res.send(err);}
      res.json({message: 'reservations has been updated'});
    });
  });
}

//DELETE reservation
exports.reservation_delete = function(req, res) {
  Reservation.remove({ _id: req.params.reservation_id }, function(err, reservation){
    if (err)
     {return  res.send(err);}
    res.json({ message: 'reservation has been deleted' })
  })
}
