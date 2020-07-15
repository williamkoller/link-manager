const express = require('express')

const router = express.Router()

router.get('/sign-in', (request, response) => {
	return response.json('Sign in')
})

router.get('/sign-up', (request, response) => {
	return response.json('Sing up')
})

module.exports = router
