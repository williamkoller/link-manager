const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = 10
const { Account } = require('../models')
const { accountSignUp, accountSignIn } = require('../validators/account')
const { getMessage } = require('../helpers/validator')
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt')

router.post('/sign-in', accountSignIn, async (request, response) => {
	try {
		const { email, password, } = request.body
		const account = await Account.findOne({ where: { email } })


		const macth = account ? bcrypt.compareSync(password, account.password) : null

		if (!macth) return reject(response.jsonBadRequest(null, getMessage('account.signin.invalid')))

		const token = generateJwt({ id: account.id })
		const refreshToken = generateRefreshJwt({ id: account.id })
		return response.jsonOK(account, getMessage('account.signin.success'), { token, refreshToken })

	} catch (error) {
		throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
	}
})

router.post('/sign-up', accountSignUp, async (request, response) => {
	try {
		const { email, password } = request.body

		const account = await Account.findOne({ where: { email } })
		if (account) return response.jsonBadRequest(null, getMessage('account.signup.email_exists'))

		const hash = bcrypt.hashSync(password, salt)

		const newAccount = await Account.create({ email, password: hash })

		const token = generateJwt({ id: newAccount.id })
		const refreshToken = generateRefreshJwt({ id: newAccount.id })
		return response.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken, })
	} catch (error) {
		throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
	}
})

router.delete('/users/:userId', async (request, response) => {
	try {
		const { userId } = request.params
		const account = await Account.findOne({
			where: {
				id: userId,
			},
		})

		if (!account) return response.jsonBadRequest(null, getMessage('account.signup.users.not_found'))


		await Account.destroy({
			where: {
				id: userId,
			},
		})
		return response.jsonOK(null, getMessage('account.signup.users.delete'))

	} catch (error) {
		throw new Error(
			error,
			response.jsonBadRequest(
				null,
				getMessage('response.json_bad_request')
			)
		)
	}

})

router.get('/users', async (request, response) => {
	try {
		const users = await Account.findAll()
		return response.jsonOK(users, getMessage('response.json_ok'))
	} catch (error) {
		throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
	}
})

module.exports = router
