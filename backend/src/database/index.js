const Sequelize = require('sequelize')
const databaseConfig = require('../config/database')
const connection = new Sequelize(databaseConfig)

const Account = require('../models/Account')
Account.init(connection)
module.exports = connection
