const Sequelize = require('sequelize')

module.exports = (sequelize) => {

  const Product = sequelize.define('products',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      price: {
        type: Sequelize.FLOAT
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true
    }
  )

  return Product
}
