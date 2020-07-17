module.exports = (sequelize, DataTypes) => {
	const Account = sequelize.define('Account', {
		email: {
			type: DataTypes.STRING,
			alloNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})
	Account.prototype.toJSON = function () {
		const values = { ...this.get() }
		delete values.password
		return values
	}
	return Account
}
