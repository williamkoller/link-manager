require('dotenv').config()
const express = require('express')
const morgam = require('morgan')
const server = express()
const route = require('./routes/routes')

server.use(express.urlencoded)
server.use(express.json())
server.use(morgam('dev'))
server.use(route)

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
