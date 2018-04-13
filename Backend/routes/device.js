const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
var Device = require('../models/device');

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


router.get("/", (req, res, next) => {
  Device.find()
    .select("name numLeft deviImage description")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        devices: docs.map(doc => {
          return {
            name: doc.name,
            numLeft: doc.numLeft,
            deviceImage: doc.deviceImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/devices/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", upload.single('deviceImage'), (req, res, next) => {
  const device = new Device({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    numLeft: req.body.numLeft,
    deviceImage: req.file.path
  });
  device
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created device successfully",
        createdDevice: {
            name: result.device,
            numLeft: result.numLeft,
            description: result.description,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/devices/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:deviceId", (req, res, next) => {
  const id = req.params.deviceId;
  Device.findById(id)
    .select('name numLeft deviceImage description')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            device: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/devices'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:deviceId", (req, res, next) => {
  const id = req.params.deviceId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Device.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'device updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/devices/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:deviceId", (req, res, next) => {
  const id = req.params.deviceId;
  Device.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'device deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/devices',
              body: { name: 'String', numLeft: 'Number', description: 'String' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
