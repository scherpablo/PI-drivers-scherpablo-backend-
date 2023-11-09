const { Teams } = require ("../../db")


const deleteTeamById = async (req, res)=>{
    const { idTeam } = req.params;
    
    try {
        const team = await Teams.findByPk(idTeam);

        if (!team) return res.status(404).json({ error: "Equipo no encontrado" })

        await team.destroy();

        return res.status(200).json({ message: "Equipo eliminado correctamente" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error interno del servidor" })
    }
}

module.exports = deleteTeamById