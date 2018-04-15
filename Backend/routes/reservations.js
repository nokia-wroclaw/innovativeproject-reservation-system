var express = require('express');
var router = express.Router();

var Reservation = require('../models/reservations');

const maxHours = 8;
const maxGuests = 12;

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
  (req.body.personName) ? reservation.personName = req.body.personName : null;
  console.log("new query")
  var curGuests = 0;

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, 100)
    curGuests = 0;
  });
  /*
  * condition #1 - other reservation within requested reservation && num of people would be > 12
  */
  /*Reservation.aggregate()
    .match({
      "startDate": {$lt: reservation.startDate, $lt: reservation.endDate},
      "endDate": {$gt: reservation.endDate, $gt: reservation.startDate}
    })
    .project({
      "numOfPeople": reservation.numOfPeople
    })
    .exec(function(err, items){
      if(err) {throw err;}
      console.log("in: ")
      console.log(items)
      var obj = items.map(function(item) {return new Reservation(item); })
      var cur = 0;
      obj.forEach(function(obj){
        cur += obj.numOfPeople
      })
      promise.then((curGuests)=>{
        curGuests += cur + reservation.numOfPeople;
        if(curGuests > maxGuests){
          console.log("IN: more than 12 people(" + (cur + reservation.numOfPeople) + ")")
        }
      })
    })
  /*
  * condition #2 - requested reservation startDate is before other reservations endDate
  * END
  */
  Reservation.aggregate()
  .match({
    "startDate": {$lte: reservation.startDate, $lte: reservation.endDate},
    "endDate": {$gte: reservation.startDate, $lte: reservation.endDate}
  })
  .project({
    "numOfPeople": 1,
    "personName": 2
  })
  .exec(function(err, items){
    if(err) {throw err;}
    console.log("end: ")
    console.log(items)
    var obj = items.map(function(item) {return new Reservation(item); })
    var cur = 0;
    obj.forEach(function(obj){
      cur += obj.numOfPeople
    })
    promise.then((val) => {
             val = reservation.numOfPeople + cur
             console.log("val_end: " + val)
             if(val > maxGuests){
               console.log("END: too many guests")

             }
             else {
               reservation.save(function(err, result){
                 if(err) { res.send(err); }
                 res.json(result);
               });
             }
           })
           .catch((err) => {console.error("error")})

  })
  /*
  * condition #3 - requested reservation endDate is after another reservation startDate
  * START
  */
  Reservation.aggregate()
    .match({
      "startDate": {$gte: reservation.startDate,  $lte: reservation.endDate},
      "endDate": {$gte: reservation.startDate, $gte: reservation.endDate}
    })
    .project({
      "numOfPeople": 1,
      "personName": 2
    })
    .exec(function(err, items){
      if(err) {throw err;}
      console.log("start")
      console.log(items)
      var obj = items.map(function(item){return new Reservation(item);})
      var cur =0;
      obj.forEach(function(obj){
        cur += obj.numOfPeople
      })
      promise.then((val) => {
               val = reservation.numOfPeople + cur
               console.log("val_start: " + val)
               if(val > maxGuests){
                 console.log("START: too many guests")

               }
               else {
                 reservation.save(function(err, result){
                   if(err) { res.send(err); }
                   res.json(result);
                 });
               }
             })
             .catch((err) => {console.error("error")})

    })
  /*
  * condition #4 - requested reservation is outside another reservations
  */
  /*Reservation.aggregate()
    .match({
      "startDate": {$gte: reservation.startDate, $lte: reservation.endDate},
      "endDate": {$lte: reservation.endDate, $gte: reservation.startDate}
    })
    .project({
      "numOfPeople": 1,
      "personName": 2
    })
    .exec(function(err, items){
      if(err) {throw err;}
      else {
        console.log("out")
        console.log(items)
        var obj = items.map(function(item){return new Reservation(item);})
        var cur =0;
        obj.forEach(function(obj){
          cur += obj.numOfPeople;
        })
      }
    })
    /*  var diff = Math.abs(reservation.endDate - reservation.startDate)/3600000;

      console.log("@" + resolve)

      if(resolve > maxGuests) {
        console.log("curguest > maxguest")
      }
      else if(diff > maxHours){
        console.log("Single reservation cannot be longer than 8 hours")
      }
      else if(req.body.numOfPeople > maxGuests){
        console.log("Max. guest cannot be bigger than 12")
      }
      else{
        reservation.save(function(err, result){
          if(err) { res.send(err); }
          res.json(result);
        });
      }
    })*/
});

router.route('/:reservation_id')
  .put(function(req, res) {
    Reservation.findById(req.params.reservation_id, function(err, reservation) {
      if (err) {  res.send(err); }
      (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
      (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
      (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
      (req.body.option) ? reservation.option = req.body.option : null;
      (req.body.personName) ? reservation.personName = req.body.personName : null;

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
