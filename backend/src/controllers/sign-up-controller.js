const Account = require('../models/Account')
module.exports = {
	store(request, response) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await Account.findOrCreate({
					where: { email: request.body.email },
					defaults: request.body.email,
				})

				return resolve(
					response.status(200).json({
						message: 'Usuário cadastrado',
						user,
					})
				)
			} catch (err) {
				reject(err)
			}
		})
	},
}
