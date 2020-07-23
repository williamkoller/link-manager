const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { accountSignIn } = require('../../validators/account')
const { generateJwt, generateRefreshJwt } = require('../../helpers/jwt')
const { getMessage } = require('../../helpers/messages')
const { Account } = require('../../models')

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

module.exports = router