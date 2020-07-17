require('dotenv').config()
const express = require('express')
const db = require('./models')
const morgan = require('morgan')
const server = express()
const authController = require('./controllers/auth')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(morgan('dev'))
server.use('/auth', authController)

db.sequelize.sync().then(() => {
	if (process.env.PORT || 3000) {
		server.listen(process.env.PORT, () => {
			console.log(
				`Lidtening on http://localhost:${
					process.env.PORT
				} - on date the ${new Date()}`
			)
		})
	}
})

module.exports = server
