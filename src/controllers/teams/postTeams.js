const { Teams, Drivers } = require("../../db");
const uuidValidate = require("uuid-validate");

const postTeams = async (req, res) => {
  const { nombre, pilotos: driverIds } = req.body;

  try {
    const existingTeam = await Teams.findOne({
      where: {
        nombre: nombre,
      },
    });

    if (existingTeam) {
      return res.status(400).json({
        error: "El equipo ya existe en la base de datos",
      });
    }

    if (driverIds && driverIds.length > 0) {
      for (const driverId of driverIds) {
        if (!uuidValidate(driverId)) {
          return res.status(400).json({
            error: "El ID no es válido (el valor esperado debe ser UUID)",
          });
        }
      }

      const existingDrivers = await Drivers.findAll({
        where: {
          id: driverIds,
        },
      });

      if (existingDrivers.length !== driverIds.length) {
        return res.status(400).json({ error: "Pilotos inexsitentes en la DB" });
      }
    }

    const maxTeamId = await Teams.max("id");

    const newTeamId = maxTeamId + 1;

    const newTeam = await Teams.create({
      id: newTeamId,
      nombre,
    });

    if (driverIds && driverIds.length > 0) {
      await newTeam.setDrivers(driverIds);
    }

    const teamWithTeams = await Teams.findByPk(newTeam.id, {
      include: Drivers,
    });

    return res.status(201).json(teamWithTeams);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = postTeams;
