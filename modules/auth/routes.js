const express = require('express')
const router = express.Router()
const authController = require('./controller')
const catchAsync = require('../../utils/catchAsync')
const { authLocal, requireAuth } = require('../../passport')

router.get('/', requireAuth, catchAsync(authController.getCurrentUser))

router.post('/signup', catchAsync(authController.signUp))
router.post('/signin', authLocal, catchAsync(authController.signIn))

module.exports = router