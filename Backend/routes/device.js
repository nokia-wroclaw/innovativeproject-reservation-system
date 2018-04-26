var express = require('express');
var router = express.Router();
const multer = require('multer');
//var path = require('path');


//var device_controller = require('../controllers/deviceController.js');
//const upload=multer({dest: '../Upload' });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../Upload/');
  },
  filename: function(req, file, cb) {
    cb(null,Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//const upload=multer({storage:storage });
var Device = require('../models/device');

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.route('/')
.get(function(req, res){
  Device.find(function(err, devices){
    if(err){res.send(err)}
    res.json(devices)
  });
})
.post(upload.single('deviceImage'),function(req, res){
console.log(req.body);
  var device = new Device();

  (req.body.name) ? device.name = req.body.name : null;
  (req.body.numLeft) ? device.numLeft = req.body.numLeft : null;
  //(req.body.deviceImage) ? device.deviceImage = req.file.path : null;
  device.deviceImage=req.file.path;
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
