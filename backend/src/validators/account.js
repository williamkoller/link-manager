const Joi = require('@hapi/joi')
const { getValidatorError } = require('../helpers/validator')

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref('password'))
    .required()
}
const options = { abortEarly: false }

const accountSignIn = (request, response, next) => {
  const { email, password } = request.body
  const schema = Joi.object({
    email: rules.email,
    password: rules.password

  })
  const { error } = schema.validate(
    { email, password },
    options
  )
  if (error) {
    const messages = getValidatorError(error, 'account.signin')
    return response.jsonBadRequest(null, null, { error: messages })
  }
  next()
}
const accountSignUp = (request, response, next) => {
  const { email, password, passwordConfirmation } = request.body
  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    passwordConfirmation: rules.passwordConfirmation
  })
  const { error } = schema.validate(
    { email, password, passwordConfirmation },
    options
  )
  if (error) {
    const messages = getValidatorError(error, 'account.signup')
    return response.jsonBadRequest(null, null, { error: messages })
  }
  next()
}

module.exports = { accountSignUp, accountSignIn }
