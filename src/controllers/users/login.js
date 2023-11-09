const { Users } = require("../../db")

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ where: { email } })
        if (!user) {
            return res.status(404).send("User not found")
        }
        if (user.password !== password) {
            return res.status(401).send("Invalid password")
        }
        return res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}

module.exports = login