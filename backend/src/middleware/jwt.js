const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (request, response, next) => {
    let token = request.headers['authorization']

    token = token ? token.slice(7, token.length) : null

    if (!token) return response.jsonUnauthorized(null, 'Invalid token')

    try {
        const decoded = verifyJwt(token)
        request.accountId = decoded.id
        next()
    } catch (error) {
        throw new Error(error, response.jsonUnauthorized(null, 'Invalid token'))
    }

}

module.exports = checkJwt