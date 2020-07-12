require('dotenv').config()
const express = require('express')
const morgam = require('morgan')
const server = express()
const route = require('./routes/routes')

server.use(morgam('dev'))
server.use(route)

server.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})

module.exports = server
