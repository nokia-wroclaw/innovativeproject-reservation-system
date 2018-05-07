var user_controller = require('../controllers/userController')
var express = require('express');
var router = express.Router()

router.get('/', user_controller.user_get)
router.get('/:user_id', user_controller.user_get_details)
router.get('/verify/:email_hash', user_controller.user_verify)
router.put('/:user_id', user_controller.user_update)
router.post('/', user_controller.user_post)
router.post('/fb', user_controller.user_fb_post)

module.exports = router;
