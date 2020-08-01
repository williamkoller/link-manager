require('dotenv').config({ path: './.env' })
const express = require('express')
const server = express()
const db = require('./models')
const morgan = require('morgan')
const responseDefault = require('./middleware/response')
const checkJwt = require('./middleware/jwt')
const linkController = require('./controllers/links/link')
const signInController = require('./controllers/sign-in/sign-in-controller')
const signUpController = require('./controllers/sign-up/sign-up-controller')
const userController = require('./controllers/users/user-controller')

server.use(morgan('dev'))

server.use(responseDefault)
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use(userController)
server.use(signInController)
server.use('/auth', signUpController)
server.use(checkJwt)
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
