const { Drivers } = require("../../db");
const uuidValidate = require("uuid-validate");

const deleteDriverById = async (req, res) => {
  const { idDriver } = req.params;

  if (!uuidValidate(idDriver)) {
    return res.status(400).json({ message: "ID no válido" });
  }

  try {
    const driver = await Drivers.findByPk(idDriver);

    if (!driver)
      return res.status(404).json({ message: "Driver no encontrado" });

    await driver.destroy();

    return res.status(200).json({ message: "Driver eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = deleteDriverById;
