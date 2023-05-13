const express = require('express')
const router = express.Router()
const authValidator = require('./auth.validator')
const authController = require('./auth.controller')

router.post(
    '/login', 
    authValidator.login, 
    authController.login
);

module.exports = router;