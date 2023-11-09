const { Teams } = require ("../../db")

const getTeamById = async (ree, res)=>{
    const { idTeam } = ree.params

    try {
        const team = await Teams.findByPk(idTeam, { include: "Drivers" })

        if (!team) return res.status(404).json({ message: "Equipo no encontrado" })

        return res.status(200).json({ message: "Equipo encontrado", team })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error interno del servidor"  })
    }
}

module.exports = getTeamById