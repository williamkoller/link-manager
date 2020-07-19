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
	return new Promise(async (resolve, reject) => {
		try {
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
			resolve(response.jsonOK(newAccount, getMessage('account.signup.success')))
		} catch (err) {
			reject(response.jsonBadRequest(err, getMessage('response.json_bad_request')))
		}
	})



})

router.delete('/users/:userId', (request, response) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { userId } = request.params
			const account = await Account.findOne({
				where: {
					id: userId
				}
			})

			if (!account) {
				reject(response.jsonBadRequest(null, getMessage('account.signup.users.not_found')))
			}
			await Account.destroy({
				where: {
					id: userId
				}
			})
			resolve(response.jsonOK(null, getMessage('account.signup.users.delete')))
		} catch (err) {
			console.error(err)
			reject(response.jsonBadRequest(err, getMessage('response.json_bad_request')))
		}
	})
})

router.get('/users', (request, response) => {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await Account.findAll()
			resolve(response.jsonOK(users, getMessage('response.json_ok')))
		} catch (err) {
			reject(response.jsonBadRequest(err, getMessage('response.json_bad_request')))
		}
	})

})

module.exports = router
