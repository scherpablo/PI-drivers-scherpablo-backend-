const { Teams } = require("../../db");

const updateTeamById = async (req, res) => {
  const { idTeam } = req.params;
  const updateTeam = req.body;

  try {
    const team = await Teams.findByPk(idTeam);

    if (!team) return res.status(404).json({ error: "Equipo no encontrado" });

    await team.update(updateTeam);

    if (updateTeam.pilotos && Array.isArray(updateTeam.pilotos)) {
      await team.setDrivers(updateTeam.pilotos);
    }

    return res.status(200).json({ message: "Equipo actualizado", team });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = updateTeamById;
