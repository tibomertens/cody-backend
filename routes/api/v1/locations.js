//require express
const express = require("express");

//require router
const router = express.Router();

//import controller for promotors
const locationController = require("../../../controllers/api/v1/locations");

// import auth from middleware/auth
const auth = require("../../../middleware/auth/Auth");

router.post("/", auth.verifyApiKey, locationController.createLocation);
router.get("/", auth.verifyApiKey, locationController.getLocations);

module.exports = router;