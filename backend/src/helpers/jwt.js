require('dotenv').config({ path: './.env' })
const jwt = require('jsonwebtoken')

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY

const options = { expiresIn: '30 minutes' }

const refreshOptions = { expiresIn: '30 days' }

const generateJwt = (paylod) => {
  return jwt.sign(paylod, tokenPrivateKey, options)
}

const generateRefreshJwt = (paylod) => {
  return jwt.sign(paylod, refreshTokenPrivateKey, refreshOptions)
}

const verifyJwt = (token) => {
  return jwt.verify(token, tokenPrivateKey)
}

const verifyRefreshJwt = (token) => {
  return jwt.verify(token, refreshTokenPrivateKey)
}

module.exports = {
  generateJwt,
  verifyJwt,
  generateRefreshJwt,
  verifyRefreshJwt
}
