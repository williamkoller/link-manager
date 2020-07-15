'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.createTable('accounts', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				lowercase: true,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.dropTable('accounts')
	},
}
