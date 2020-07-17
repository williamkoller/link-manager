const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Account } = require('../models')
const { accountSignUp } = require('../validators/account')
const { getMessage } = require('../helpers/validator')
const salt = 10

router.get('/sign-in', (request, response) => {
	return response.jsonOK(null)
})

router.post('/sign-up', accountSignUp, async (request, response) => {
	const { email, password } = request.body

	const account = await Account.findOne({ where: { email } })
	if (account) {
		return response.jsonBadRequest(
			null,
			getMessage('account.signup.email_exists')
		)
	}

	const hash = bcrypt.hashSync(password, salt)
	const newAccount = await Account.create({
		email,
		password: hash,
	})
	console.log(newAccount)
	return response.jsonOK(newAccount, getMessage('account.signup.success'))
})

router.get('/users', async (request, response) => {
	const users = await Account.findAll()
	if (users == '' && users == null) {
		return response.json('Users not found')
	}
	return response.json(users)
})
module.exports = router
