exports.getSignIn = (request, response) => {
	return new Promise((resolve, reject) => {
		try {
			const result = response.send({ message: 'sign in ' })
			resolve(result)
		} catch (err) {
			reject(err)
		}
	})
}
