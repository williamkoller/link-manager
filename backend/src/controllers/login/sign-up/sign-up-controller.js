const express = require('express')

const router = express.Router()
const bcrypt = require('bcrypt')

const salt = 10
const { accountSignUp } = require('../../../validators/account')
const { getMessage } = require('../../../helpers/messages')
const { Account } = require('../../../models')
const { generateJwt, generateRefreshJwt } = require('../../../helpers/jwt')

router.post('/sign-up', accountSignUp, async (request, response) => {
  try {
    const { email, password } = request.body

    const account = await Account.findOne({ where: { email } })
    if (account) return response.jsonBadRequest(null, getMessage('account.signup.email_exists'))

    const hash = bcrypt.hashSync(password, salt)

    const newAccount = await Account.create({ email, password: hash })

    const token = generateJwt({ id: newAccount.id })
    const refreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion })
    return response.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken })
  } catch (error) {
    throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
  }
})

module.exports = router
