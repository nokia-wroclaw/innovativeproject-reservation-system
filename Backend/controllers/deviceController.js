var Device = require('../models/device');
const multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



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

exports.device_post =  function(req, res) {
  //var device = new Device();
  //(req.body.name) ? device.name = req.body.name : null;
  //(req.body.numLeft) ? device.numLeft = req.body.numLeft : null;
  //(req.body.description) ? device.description= req.body.description : null;
  //console.log(req.file);
  //if(req.file === null) {return res.send(400)}
  const newDevice = new Device({
    name: req.body.name,
    numLeft: req.body.numLeft,
    //deviceImage: req.file.path
  });
  //(req.body.deviceImage) ? device.deviceImage = req.file.path : null;
  //console.log("+" + req.file.path);
  newDevice.save(function(err, result){
    if(err) {return res.send(err);}
    res.json(result);
  });
}

exports.device_put = function(req,res) {
  Device.findById(req.params.device_id, function(err, device) {
    if (err) { return  res.send(err); }
    (req.body.name) ? device.name = req.body.name : null;
    (req.body.numLeft) ? device.numLeft= req.body.numLeft : null;
    (req.body.description) ? device.description= req.body.description : null;

      device.save(function(err, result) {
        if (err){ return res.send(err);}
        res.json(result);
      });
    })
}

exports.device_delete = function(req, res) {
  Device.remove({ _id: req.params.device_id }, function(err, device){
    if (err)
      {return res.send(err);}
    res.json({ message: 'device has been deleted' })
  })
}
