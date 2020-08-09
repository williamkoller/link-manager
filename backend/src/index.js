require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors')
const server = express()
const db = require('./models')
const morgan = require('morgan')
const responseDefault = require('./middleware/response')
const checkJwt = require('./middleware/jwt')
const linkController = require('./controllers/link')
const authcontroller = require('./controllers/auth')
server.use(morgan('dev'))

server.use(cors)
server.use(responseDefault)
server.use(checkJwt)
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/auth', authcontroller)
server.use('/link', linkController)

db.sequelize.sync().then(() => {
  if (process.env.PORT | 3001) {
    server.listen(process.env.PORT, () => {
      console.log(`Listening on http://localhost:${process.env.PORT} - on date the ${new Date()}`
      )
    })
  }
})

module.exports = server
