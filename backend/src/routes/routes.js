const express = require('express')
const route = express.Router()
const signInController = require('../controllers/sign-in-controller')
const signUpController = require('../controllers/sign-up-controller')

route.get('/auth/sign-in', signInController.getSignIn)
route.post('/auth/sign-up', signUpController.store)

module.exports = route
