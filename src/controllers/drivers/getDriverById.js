const axios = require("axios");
const dotenv = require("dotenv");
const { Drivers } = require("../../db");
const uuidValidate = require("uuid-validate");

dotenv.config();

const urlApiRest = process.env.URL_API_REST;

const getDriverById = async (req, res) => {
  const { idDriver } = req.params;

  try {
    if (uuidValidate(idDriver)) {
      const driverFromDB = await Drivers.findByPk(idDriver, {
        include: "Teams",
      });

      if (driverFromDB) return res.json(driverFromDB);
    }

    const { data } = await axios(`${urlApiRest}/drivers/${idDriver}`);

    if (!data) return res.status(404).json({ error: "Driver no encontrado" });

    if (!data.image.url){
      data.image.url = "https://pbs.twimg.com/profile_images/594696416238395393/8LY_wYX7_400x400.jpg" ;
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getDriverById;
