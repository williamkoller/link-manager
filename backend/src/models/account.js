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
	return Account
}
