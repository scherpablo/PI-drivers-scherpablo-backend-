const axios = require("axios");
const dotenv = require("dotenv");
const { Drivers, Teams } = require("../../db");
const { Op } = require("sequelize");

dotenv.config();

const urlApiRest = process.env.URL_API_REST;

const getDrivers = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const queryName =
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

      const driversFromDb = await Drivers.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${queryName}%`,
          },
        },
        limit: 15,
        include: Teams,
      });

      const { data } = await axios(
        `${urlApiRest}/drivers?name.forename=${queryName}`
      );

      const apiData = data || []

      if (apiData.length > 0) {
        // const apiResults = apiData
        const apiResults = apiData.map((item) => {
          return {
            id: item.id,
            name: { forename: item.name.forename, surname: item.name.surname  },
            dob: item.dob,
            nationality: item.nationality,
            teams: item.teams,
            image: { url: item.image.url || "https://pbs.twimg.com/profile_images/594696416238395393/8LY_wYX7_400x400.jpg" },
          };
        });

        const combinedResults = driversFromDb.concat(apiResults).slice(0, 15);

        if (combinedResults.length === 0) {
          return res
            .status(404)
            .json({ message: "No se encontraron resultados" });
        }

        return res.status(200).json(combinedResults);
      } else {
        return res.status(200).json(driversFromDb);
      }
    } else {
      const driversFromDb = await Drivers.findAll({
        include: Teams,
      });

      const { data } = await axios(`${urlApiRest}/drivers`);

      data.forEach((driver) => {
        if (!driver.image.url) {
          driver.image.url =
            "https://pbs.twimg.com/profile_images/594696416238395393/8LY_wYX7_400x400.jpg";
        }
      });

      const combinedResults = driversFromDb.concat(data);

      return res.status(200).json(combinedResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los conductores");
  }
};

module.exports = getDrivers;