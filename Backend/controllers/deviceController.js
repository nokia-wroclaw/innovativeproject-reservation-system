
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

exports.device_put = function(req,res) {
  console.log('put')
}

exports.device_delete = function(req, res) {
  /*Device.remove({ _id: req.params.device_id }, function(err, device){
    if (err)
      res.send(err);
    res.json({ message: 'device has been deleted' })
  })*/
}
