
var Device = require('../models/device');

exports.device_get = function(req, res){
  Device.find(function(err, devices){
    if(err){res.send(err)}
    res.json(devices)
  });
}

exports.device_details_get = (function(req, res) {
  Device.findById(req.params.device_id, function(err, device){
    if(err) return res.send(err);
    res.json(device);
  });
})

exports.device_post = function(req, res) {
  var device = new Device();
  (req.body.name) ? device.name = req.body.name : null;
  (req.body.numLeft) ? device.numLeft = req.body.numLeft : null;
  (req.body.description) ? device.description= req.body.description : null;

  device.save(function(err, result){
    if(err) return res.send(err);
    res.json(result);
  });
}

exports.device_put = function(req,res) {
  Device.findById(req.params.device_id, function(err, device) {
    if (err) {        res.send(err); }
    (req.body.name) ? device.name = req.body.name : null;
    (req.body.numLeft) ? device.numLeft= req.body.numLeft : null;
    (req.body.description) ? device.description= req.body.description : null;

      device.save(function(err, result) {
        if (err) return res.send(err);
        res.json(result);
      });
    })
}

exports.device_delete = function(req, res) {
  Device.remove({ _id: req.params.device_id }, function(err, device){
    if (err)
      res.send(err);
    res.json({ message: 'device has been deleted' })
  })
}
