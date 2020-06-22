const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
process.env.SECRET_KEY = 'secret'
const AuthController = require('../controller/authController');

router.get('/user/home', AuthController.home);
router.post('/user/register', AuthController.register);
router.post('/user/login', AuthController.login);
router.get('/profile',AuthController.profile);
module.exports = router;