var express = require('express');
var router = express.Router();

var Device = require('../models/device')
var Reservation = require('../models/reservations')

var reservation_controller = require('../controllers/reservationController')

router.get('/', reservation_controller.reservation_get);
router.get('/reservation_id', reservation_controller.reservation_details_get);
router.post('/', reservation_controller.reservation_post);
router.put('/:reservation_id', reservation_controller.reservation_put)
router.delete('/:reservation_id', reservation_controller.reservation_delete)

module.exports = router;
