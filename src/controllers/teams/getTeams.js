const axios = require("axios");
const dotenv = require("dotenv");
const { Teams, sequelize } = require("../../db");

dotenv.config();

const urlApiRest = process.env.URL_API_REST;

const getTeams = async (req, res) => {
  try {
    const teamsInDatabase = await Teams.findAll();

    const { data } = await axios.get(`${urlApiRest}/drivers`);

    const uniqueTeams = new Set();

    data.forEach((driver) => {
      if (driver.teams) {
        const driverTeams = driver.teams.split(",").map((team) => team.trim());
        driverTeams.forEach((team) => uniqueTeams.add(team));
      }
    });

    const teamsFromAPI = Array.from(uniqueTeams);

    const teamsToSave = teamsFromAPI.filter((apiTeam) => {
      const teamExists = teamsInDatabase.some(
        (dbTeam) => dbTeam.nombre === apiTeam
      );
      return !teamExists;
    });

    const teamsFromAPIMapped = teamsToSave.map((name, index) => ({
      id: teamsInDatabase.length + index + 1,
      nombre: name,
    }));

    const combinedTeams = [...teamsInDatabase, ...teamsFromAPIMapped];

    return res.status(200).json(combinedTeams);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error al obtener los equipos");
  }
};

module.exports = getTeams;
