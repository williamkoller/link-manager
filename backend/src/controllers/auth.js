const express = require('express')

const router = express.Router()
const bcrypt = require('bcrypt')

const salt = 10
const { accountSignUp, accountSignIn } = require('../validators/account')
const { getMessage } = require('../helpers/messages')
const { Account } = require('../models')
const { generateJwt, generateRefreshJwt, verifyRefreshJwt } = require('../helpers/jwt')
const { getTokenFromHeaders } = require('../helpers/jwt')

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

router.post('/sign-in', accountSignIn, async (request, response) => {
  try {
    const { email, password } = request.body
    const account = await Account.findOne({ where: { email } })

    const macth = account ? bcrypt.compareSync(password, account.password) : null

    if (!macth) return (response.jsonBadRequest(null, getMessage('account.signin.invalid')))

    const token = generateJwt({ id: account.id })
    const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion })
    return response.jsonOK(account, getMessage('account.signin.success'), { token, refreshToken })
  } catch (error) {
    throw new Error(error, response.jsonBadRequest(null, getMessage('response.json_bad_request')))
  }
})

router.post('/refresh', async (request, response) => {
  const token = getTokenFromHeaders(request.headers)
  if (!token) {
    return response.jsonUnauthorized(null, 'Invalid token')
  }
  try {
    const decoded = verifyRefreshJwt(token)
    const account = await Account.findByPk(decoded.id)
    if (!account) return response.jsonUnauthorized(null, 'Invalid token')

    if (decoded.version !== account.jwtVersion) {
      return response.jsonUnauthorized(null, 'Invalid token')
    }

    const meta = {
      token: generateJwt({ id: account.id })
    }
    return response.jsonOK(null, null, meta)
  } catch (error) {
    throw new Error('Invalid token', error)
  }
})

module.exports = router
