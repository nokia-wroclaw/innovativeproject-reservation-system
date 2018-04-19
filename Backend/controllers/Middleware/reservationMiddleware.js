var Reservation = require('../../models/reservations')
var express = require('express')
var app = express()

var maxGuests = 12;
var maxHours = 8;

module.exports = {
  CheckTime: function(req, res, next){
    var reservation = new Reservation();
    (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
    (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
    
    req.timeDifference = Math.abs(reservation.endDate - reservation.startDate)/3600000;
    next()
  }
}





  /*var reservation = new Reservation();
  (req.body.startDate) ? reservation.startDate = req.body.startDate : null;
  (req.body.endDate) ? reservation.endDate = req.body.endDate : null;
  (req.body.numOfPeople) ? reservation.numOfPeople = req.body.numOfPeople : null;
  (req.body.option) ? reservation.option = req.body.option : null;
  (req.body.personName) ? reservation.personName = req.body.personName : null;
  console.log("*********")
  console.log("new query")
  console.log("*********")

  var queries = [
    //end condition - ✓
    {$lt: reservation.startDate, $lt: reservation.endDate},
    {$gt: reservation.startDate, $lt: reservation.endDate},
    //start condition - triggers also in - works alone
    {$gt: reservation.startDate,  $lt: reservation.endDate},
    {$gt: reservation.startDate, $gt: reservation.endDate},
    //in condition - triggers also start - also work for start
    {$lt: reservation.startDate, $lt: reservation.endDate},
    {$gt: reservation.startDate, $gt: reservation.endDate},
    //out condition - triggers also end
    {$gt: reservation.startDate, $lt: reservation.endDate},
    {$gt: reservation.startDate, $lt: reservation.endDate},
  ];

  function getTimeDifference(){
    var diff = Math.abs(reservation.endDate - reservation.startDate)/3600000;
    if(diff < maxHours){
        return false
    }
    else{
      return true
    }
  }

  var query = {
    endQuery:Reservation.find({"startDate": queries[0], "endDate": queries[1]}).exec(),
    startQuery: Reservation.find({"startDate": queries[2], "endDate": queries[3]}).exec(),
    inQuery: Reservation.find({"startDate": queries[4], "endDate": queries[5]}).exec(),
    outQuery: Reservation.find({"startDate": queries[6], "endDate": queries[7]}).exec()
  };

  function Query(){
    return new Promise((resolve, reject)=>{
      query.endQuery.then((found) => {
        console.log("query_found" + found)
        if(found != null) {
          var obj = found.map(function(item){return new Reservation(item);})
          var cur = 0;
          obj.forEach(function(obj){
            cur += obj.numOfPeople
          })
          setTimeout(()=>{
            if( (cur + reservation.numOfPeople) <= maxGuests && cur > 0 && !getTimeDifference() ){
              return resolve(cur)
              //req.endCondition = cur + reservation.numOfPeople
              //next()
            }
            else {
              var errors = [
                cur + reservation.numOfPeople,
                getTimeDifference()
              ];
              return reject(errors)
            }
          },100)
        }
      })
    })
  }

  Query()
    .then((result) => {
      //if(result + reservation.numOfPeople <= maxGuests){
      //  reservation.save(function(err, result){
      //    if(err) { res.send(err); }
      //    res.json(result);
      //  });
      //}
        console.log("result " + result)
        req.endCondition = result
        next()
    })
    .catch((result) => {
      res.json({errTooManyPeople: result[0], errOverTimeLimit: result[1]})
  })*/

// }

//app.use(endCondition)
//app.use(startCondition)
//app.use(inCondition)
//app.use(outCondition)
