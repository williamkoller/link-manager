require('dotenv').config()
module.exports = {
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.BS_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true
    }
}