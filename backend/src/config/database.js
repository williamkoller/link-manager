require('dotenv').config()
module.exports = {
	dialect: 'mysql',
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DATABASE,
	host: process.env.DB_HOST,
	port: 3306,
	define: {
		timestamps: true,
		underscored: true,
	},
}
