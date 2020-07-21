const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const salt = 10
const { Account } = require('../models')
const { accountSignUp, accountSignIn } = require('../validators/account')
const { getMessage } = require('../helpers/validator')
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt')

router.post('/sign-in', accountSignIn, (request, response) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { email, password, } = request.body
			const account = await Account.findOne({ where: { email } })


			const macth = account ? bcrypt.compareSync(password, account.password) : null

			if (!macth) return reject(response.jsonBadRequest(null, getMessage('account.signin.invalid')))

			const token = generateJwt({ id: account.id })
			const refreshToken = generateRefreshJwt({ id: account.id })
			resolve(response.jsonOK(account, getMessage('account.signin.success'), { token, refreshToken }))

		} catch (error) {
			reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
		}
	})



})

router.post('/sign-up', accountSignUp, (request, response) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { email, password } = request.body

			const account = await Account.findOne({ where: { email } })
			if (account) return response.jsonBadRequest(null, getMessage('account.signup.email_exists'))

			const hash = bcrypt.hashSync(password, salt)

			const newAccount = await Account.create({ email, password: hash })

			const token = generateJwt({ id: newAccount.id })
			const refreshToken = generateRefreshJwt({ id: newAccount.id })
			resolve(response.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken, }))
		} catch (error) {
			reject(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
		}
	})
})

router.delete('/users/:userId', (request, response) => {
	return new Promise(async (resolve, reject) => {
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
			resolve(
				response.jsonOK(null, getMessage('account.signup.users.delete'))
			)
		} catch (error) {
			reject(
				error,
				response.jsonBadRequest(
					null,
					getMessage('response.json_bad_request')
				)
			)
		}
	})
})

router.get('/users', (request, response) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await Account.findAll()
			resolve(response.jsonOK(users, getMessage('response.json_ok')))
		} catch (error) {
			reject(
				error,
				response.jsonBadRequest(
					null,
					getMessage('response.json_bad_request')
				)
			)
		}
	})
})

module.exports = router
