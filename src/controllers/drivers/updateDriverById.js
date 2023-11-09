const { Drivers } = require("../../db");
const uuidValidate = require("uuid-validate");

const updateDriverById = async (req, res) => {
  const { idDriver } = req.params;
  const updateDriver = req.body;

  if (!uuidValidate(idDriver))
    return res.status(400).json({ message: "ID no valido" });

  try {
    const driver = await Drivers.findByPk(idDriver);

    if (!driver)
      return res.status(404).json({ message: "Driver no encontrado" });

    await driver.update(updateDriver);

    if (updateDriver.equipos && Array.isArray(updateDriver.equipos)) {
      await driver.setTeams(updateDriver.equipos);
    }

    return res.status(200).json({ message: "Driver actualizado", driver });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = updateDriverById;
