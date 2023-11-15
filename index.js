const server = require("./src/server")
const { conn } = require('./src/db.js')
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001

dotenv.config();

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
}).catch(error => console.error(error))
