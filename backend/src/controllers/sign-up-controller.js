exports.getSignUp = (request, response) => {
	return new Promise((resolve, reject) => {
		try {
			const result = response.send({ message: 'sign up ' })
			resolve(result)
		} catch (err) {
			reject(err)
		}
	})
}
