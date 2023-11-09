require("dotenv").config()
const { Sequelize } = require("sequelize")

const DriversModel = require("./models/Drivers")
const TeamsModel = require("./models/Teams")

const dbDeployUrl = process.env.DATABASE_DEPLOY_URL
const dbLocalUrl = process.env.DATABASE_LOCAL_URL

const sequelize = new Sequelize(dbDeployUrl || dbLocalUrl, {
  logging: false,
  native: false,
})

DriversModel(sequelize)
TeamsModel(sequelize)

const { Drivers, Teams } = sequelize.models

Drivers.belongsToMany(Teams, { through: "drivers_teams", timestamps: false })
Teams.belongsToMany(Drivers, { through: "drivers_teams", timestamps: false })

module.exports = {
  Drivers,
  Teams,
  sequelize,
  conn: sequelize,
}
