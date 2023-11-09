const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define(
    "Teams",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  )
}
