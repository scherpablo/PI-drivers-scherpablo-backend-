const { Router } = require("express");

// DRIVERS CONTROLLERS
const getDrivers = require("../controllers/drivers/getDrivers");
const getDriverById = require("../controllers/drivers/getDriverById");
const postDrivers = require("../controllers/drivers/postDrivers");
const updateDriverById = require("../controllers/drivers/updateDriverById");
const deleteDriverById = require("../controllers/drivers/deleteDriverById");

// TEAMS CONTROLLERS
const getTeams = require("../controllers/teams/getTeams");
const getTeamById = require("../controllers/teams/getTeamById");
const postTeams = require("../controllers/teams/postTeams");
const updateTeamById = require("../controllers/teams/updateTeamById");
const deleteTeamById = require("../controllers/teams/deleteTeamById");  

const router = Router();

// DRIVERS ROUTES
router.get("/drivers", getDrivers);
router.get("/drivers/:idDriver", getDriverById);
router.post("/drivers", postDrivers);
router.put("/drivers/:idDriver", updateDriverById);
router.delete("/drivers/:idDriver", deleteDriverById);

// TEAMS ROUTES
router.get("/teams", getTeams);
router.get("/teams/:idTeam", getTeamById);
router.post("/teams", postTeams);
router.put("/teams/:idTeam", updateTeamById);
router.delete("/teams/:idTeam", deleteTeamById);

module.exports = router;
