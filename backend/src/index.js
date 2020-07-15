require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const server = express()
require('./database')
const authController = require('./controllers/auth')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan('dev'))
server.use('/auth', authController)

if (process.env.PORT || 3000) {
	server.listen(process.env.PORT, () => {
		console.log(
			`Server running on http://localhost:${
				process.env.PORT
			} - on date the ${new Date()}`
		)
	})
}

module.exports = server
