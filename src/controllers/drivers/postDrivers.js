const { Drivers, Teams } = require("../../db");

const postDriver = async (req, res) => {
  const {
    nombre,
    apellido,
    descripcion,
    imagen,
    nacionalidad,
    fecha_de_nacimiento,
    equipos: teamIds,
  } = req.body;

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI32fIvEA4GGTHuyYICh8Y2z-WJgSqybv8XQ";

  const imageToUse = imagen ? imagen : defaultImage;

  try {
    if (teamIds && teamIds.length > 0) {
      const existingTeams = await Teams.findAll({
        where: {
          id: teamIds,
        },
      });

      if (existingTeams.length !== teamIds.length) {
        return res
          .status(400)
          .json({
            error:
              "Algunos equipos no existen en la base de datos.Crealos para poder asignarlos a un piloto.",
          });
      }
    }

    const newDriver = await Drivers.create({
      nombre,
      apellido,
      descripcion,
      imagen: imageToUse,
      nacionalidad,
      fecha_de_nacimiento,
    });

    if (teamIds && teamIds.length > 0) {
      await newDriver.addTeams(teamIds);
    }

    const driverWithTeams = await Drivers.findByPk(newDriver.id, {
      include: Teams,
    });

    return res.status(201).json(driverWithTeams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = postDriver;
