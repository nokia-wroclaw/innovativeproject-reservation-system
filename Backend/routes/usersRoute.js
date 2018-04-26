var user_controller = require('../controllers/userController')
var express = require('express');
var router = express.Router()

router.get('/', user_controller.user_get)
router.get('/:user_id', user_controller.user_get_details)

router.post('/', user_controller.user_post)

module.exports = router;
