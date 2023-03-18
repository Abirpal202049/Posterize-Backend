const express = require('express');
const router = express.Router()

// Importing the controller
const { login, getAllOffer } = require('../controllers/userController');

// Imporing the middleware
const { isLoggedin } = require('../middleware/isLoggedIn');


router.route('/login').post(login)
router.route('/dashboard').get(isLoggedin, getAllOffer)

module.exports = router;