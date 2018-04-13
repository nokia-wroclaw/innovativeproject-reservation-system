var express = require('express');
var router = express.Router();

var Device = require('../models/device');
//var device_controller = require('../controllers/deviceController.js');

router.route('/')
.get(function(req, res){
  Device.find(function(err, devices){
    if(err){res.send(err)}
    res.json(devices)
  });
})
.post(function(req, res){
console.log(req.body);
  var device = new Device();
  (req.body.name) ? device.name = req.body.name : null;
  (req.body.numLeft) ? device.numLeft = req.body.numLeft : null;
  (req.body.deviceImage) ? device.deviceImage = req.body.deviceImage : null;
  (req.body.description) ? device.description = req.body.description : null;

  device.save(function(err, result){
    if(err) return res.send(err);
    res.json(result);
  });
});

router.route('/:device_id')
  .get(function(req, res) {
    Device.findById(req.params.device_id, function(err, device){
      if(err) return res.send(err);
      res.json(device);
    });
  })
  .put(function(req, res) {
    console.log(req.body);
    Device.findById(req.params.device_id, function(err, device) {
      if (err) {        res.send(err); }
      (req.body.name) ? device.name = req.body.name : null;
      (req.body.numLeft) ? device.numLeft= req.body.numLeft : null;
     device.save(function(err, result) {
        if (err) return res.send(err);
        res.json(result);
      });
    });
  })
  .delete(function(req, res) {
    Device.remove({ _id: req.params.device_id }, function(err, device){
      if (err)
        res.send(err);
      res.json({ message: 'device has been deleted' })
    })
});

module.exports = router;
