const Account = require('../models/Account')
module.exports = {
	store(request, response) {
		return new Promise(async (resolve, reject) => {
			try {
				const { email, password } = request.body
				const user = await Account.create({ email, password })

				resolve(
					response.status(200).json({
						message: 'Usuário cadastrado com sucesso',
						user,
					})
				)
				setTimeout(() => {}, 2000)
			} catch (err) {
				reject(
					response.status(400).json({
						message: 'Não foi possivel realizar seu cadastro',
					})
				)
			}
		})
	},
}
