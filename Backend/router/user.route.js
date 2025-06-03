const express = require('express');
const router = express.Router();
const UserController = require("../controller/user.controller");
const { protect } = require('../middleware/auth');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getuser', protect, UserController.getuser);

module.exports = router;
