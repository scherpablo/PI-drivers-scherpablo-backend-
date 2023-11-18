require("dotenv").config()
const { Sequelize } = require("sequelize")

const UsersModel = require("./models/Users")  
const DriversModel = require("./models/Drivers")
const TeamsModel = require("./models/Teams")

const dbDeployUrl = 
process.env.DATABASE_DEPLOY_URL
const dbLocalUrl = process.env.DATABASE_LOCAL_URL
const sequelize = new Sequelize(dbDeployUrl || dbLocalUrl, {
  logging: false,
  native: false,
})

UsersModel(sequelize)
DriversModel(sequelize)
TeamsModel(sequelize)

const { Users, Drivers, Teams } = sequelize.models

Drivers.belongsToMany(Teams, { through: "drivers_teams", timestamps: false })
Teams.belongsToMany(Drivers, { through: "drivers_teams", timestamps: false })

module.exports = {
  Users,
  Drivers,
  Teams,
  sequelize,
  conn: sequelize,
}
