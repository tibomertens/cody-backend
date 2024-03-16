//require express
const express = require("express");

//create a new router
const router = express.Router();

//require the renovations controller
const userRenovation = require("../../../controllers/api/v1/userRenovation");

//add the routes
router.get("/users/:userId/renovations/:renovationId", userRenovation.getUserRenovation);

//export the router
module.exports = router;