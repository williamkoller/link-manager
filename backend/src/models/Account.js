const { Model, DataTypes } = require('sequelize')

class Account extends Model {
	static init(sequelize) {
		super.init(
			{
				email: DataTypes.STRING,
				password: DataTypes.STRING,
			},
			{
				sequelize,
			}
		)
	}
}

module.exports = Account
