const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt')

const checkJwt = (request, response, next) => {
  const { url: path } = request

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh']
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path))
  if (isExcluded) return next()

  const token = getTokenFromHeaders(request.headers)

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
