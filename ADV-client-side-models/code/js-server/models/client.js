const Sequelize = require('sequelize')

module.exports = (sequelize) => {

  const Client = sequelize.define('clients',
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: Sequelize.STRING,
      }
    },
    {
      getterMethods: {
        fullName() {
          return this.firstName + ' ' + this.lastName
        }
      }
    },
    {
      freezeTableName: true
    }
  )

  return Client
}
