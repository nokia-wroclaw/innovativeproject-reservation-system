var express = require('express');
var router = express.Router();

var device_controller = require('../controllers/deviceController.js')

/* GET home page. */

router.get('/', device_controller.index);

module.exports = router;
