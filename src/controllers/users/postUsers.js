const { Users } = require("../../db");

const postUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan Datos" });
  }

  try {
    const [user, created] = await Users.findOrCreate({
      where: { email },
      defaults: { password },
    });
    if (created)
      return res
        .status(201)
        .json({ message: "Successfully Created User", user });
    else return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = postUser;
