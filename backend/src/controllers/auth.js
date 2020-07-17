const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Account } = require('../models')
const salt = 10
router.get('/sign-in', (request, response) => {
	return response.json('Sign in')
})

router.post('/sign-up', async (request, response) => {
	const { email, password } = request.body

	const hash = bcrypt.hashSync(password, salt)
	const result = await Account.create({
		email,
		password: hash,
	})
	console.log(result)
	return response.json(result.email)
})

module.exports = router
