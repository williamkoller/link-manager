const express = require('express')
const router = express.Router()

const { Account } = require('../../models')
const { getMessage } = require('../../helpers/validator')

router.delete('/users/:userId', async (request, response) => {
  try {
    const { userId } = request.params
    const account = await Account.findOne({
      where: {
        id: userId
      }
    })

    if (!account) return response.jsonBadRequest(null, getMessage('account.signup.users.not_found'))

    await Account.destroy({
      where: {
        id: userId
      }
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
