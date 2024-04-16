//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const locationController = require("../../../controllers/api/v1/locations");

router.post("/", locationController.createLocation);
router.get("/", locationController.getLocations);

module.exports = router;