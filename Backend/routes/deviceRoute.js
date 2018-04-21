var express = require('express');
var router = express.Router();

var device_controller = require('../controllers/deviceController.js');

router.get('/', device_controller.device_get);
router.post('/', device_controller.device_post)

router.get('/:device_id', device_controller.device_details_get)

router.put('/:device:id', device_controller.device_put)
router.delete('/:device_id', device_controller.device_delete)

module.exports = router;
