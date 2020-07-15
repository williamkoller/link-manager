const express = require('express')
const { Account } = require('../models')
const router = express.Router()

router.get('/sign-in', (request, response) => {
	return response.json('Sign in')
})

router.get('/sign-up', async (request, response) => {
	const { email, password } = request.body
	const result = await Account.create({
		email,
		password,
	})
	console.log(result)
	return response.json(result)
})

module.exports = router
