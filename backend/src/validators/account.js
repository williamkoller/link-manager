const Joi = require('@hapi/joi')
const { getValidatorError } = require('../helpers/validator')

const accountSignUp = (request, response, next) => {
	const { email, password, password_confirmation } = request.body
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
		password_confirmation: Joi.string()
			.valid(Joi.ref('password'))
			.required(),
	})
	const options = { abortEarly: false }
	const { error } = schema.validate(
		{ email, password, password_confirmation },
		options
	)
	if (error) {
		const messages = getValidatorError(error, 'account.signup')
		return response.jsonBadRequest(null, null, { error: messages })
	}
	next()
}

module.exports = { accountSignUp }
