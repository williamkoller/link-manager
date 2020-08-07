module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      alloNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jwtVersion: {
      type: DataTypes.INTEGER,
      alloNull: false,
      defaultValue: 0
    }
  })

  Account.associate = (models) => {
    Account.hasMany(models.Link, { foreignKey: 'accountId' })
  }

  Account.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }
  return Account
}
